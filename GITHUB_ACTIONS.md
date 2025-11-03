# GitHub Actions - Automatización de Compilación (Opcional)

Este archivo de configuración te permite automatizar la compilación de APKs cada vez que hagas push a la rama main.

## 📝 Configuración

### Paso 1: Crear el archivo de workflow

Crea el directorio y archivo:
```
.github/
└── workflows/
    └── android-build.yml
```

### Paso 2: Copiar la configuración

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build web app
        run: npm run build

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Sync Capacitor
        run: |
          npm install -g @capacitor/cli
          npx cap sync android

      - name: Build Android APK
        run: |
          cd android
          chmod +x ./gradlew
          ./gradlew assembleDebug

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: app-debug
          path: android/app/build/outputs/apk/debug/app-debug.apk

      - name: Create Release (on tag)
        if: startsWith(github.ref, 'refs/tags/')
        uses: softprops/action-gh-release@v1
        with:
          files: android/app/build/outputs/apk/debug/app-debug.apk
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Paso 3: Habilitar GitHub Actions

1. Ve a tu repositorio en GitHub
2. Ve a Settings → Actions → General
3. En "Actions permissions", selecciona "Allow all actions and reusable workflows"
4. Guarda los cambios

### Paso 4: Hacer push

```bash
git add .github/workflows/android-build.yml
git commit -m "Add GitHub Actions for Android build"
git push
```

## 🎯 Uso

### Compilación Automática

Cada vez que hagas push a main, GitHub Actions automáticamente:
1. ✅ Instala las dependencias
2. ✅ Compila la aplicación web
3. ✅ Sincroniza con Capacitor
4. ✅ Compila el APK de Android
5. ✅ Sube el APK como artifact

### Descargar el APK Compilado

1. Ve a tu repositorio en GitHub
2. Haz clic en "Actions"
3. Selecciona el workflow run más reciente
4. En "Artifacts", descarga "app-debug"

### Crear un Release con APK

Para crear un release con el APK incluido:

```bash
# Crear y push un tag
git tag v1.0.0
git push origin v1.0.0
```

Esto automáticamente:
- Compilará el APK
- Creará un release en GitHub
- Adjuntará el APK al release

## 🔐 Compilación Firmada (Release APK)

Para compilar APKs de release firmados en GitHub Actions:

### Paso 1: Codificar tu keystore en base64

```bash
base64 traslados-jasminez.keystore > keystore.base64.txt
```

### Paso 2: Agregar secrets en GitHub

1. Ve a Settings → Secrets and variables → Actions
2. Agrega estos secrets:
   - `KEYSTORE_BASE64`: contenido de keystore.base64.txt
   - `KEYSTORE_PASSWORD`: tu contraseña del keystore
   - `KEY_ALIAS`: "traslados"
   - `KEY_PASSWORD`: tu contraseña de la key

### Paso 3: Modificar el workflow

Agrega estos pasos antes de "Build Android APK":

```yaml
      - name: Decode Keystore
        run: |
          echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 -d > android/app/keystore.jks

      - name: Build Release APK
        run: |
          cd android
          chmod +x ./gradlew
          ./gradlew assembleRelease
        env:
          KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
```

Y actualiza el archivo `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file("keystore.jks")
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

## 📊 Monitoreo

- Ve a la pestaña "Actions" en tu repositorio para ver el estado de las compilaciones
- Los logs detallados te ayudarán a diagnosticar problemas
- Las compilaciones típicamente toman 5-10 minutos

## 🎉 Beneficios

✅ **Compilación automática** en cada cambio
✅ **Sin necesidad de Android Studio local** para compilar
✅ **APKs disponibles** para descargar directamente
✅ **Historial de compilaciones** para cada cambio
✅ **Releases automatizados** con APKs adjuntos

## ⚠️ Limitaciones

- El plan gratuito de GitHub Actions incluye 2,000 minutos/mes
- Cada compilación de Android usa ~5-10 minutos
- Puedes compilar ~200-400 veces al mes en el plan gratuito

## 🔧 Solución de Problemas

### "Permission denied" en gradlew
Asegúrate de incluir:
```yaml
chmod +x ./gradlew
```

### "SDK not found"
El workflow usa `android-actions/setup-android` para configurar el SDK automáticamente.

### "Build failed"
Revisa los logs detallados en la pestaña Actions → selecciona tu run → ve los logs de cada paso.

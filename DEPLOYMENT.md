# Guía de Despliegue - Registro de Traslados Jasminez

Esta guía te ayudará a compilar e instalar la aplicación Registro de Traslados en tu dispositivo Android.

## 📋 Requisitos Previos

### Para desarrollo local:
- Node.js 18+ instalado
- Android Studio instalado
- Java Development Kit (JDK) 17+
- Un dispositivo Android o emulador

### Para instalación directa:
- Solo necesitas el archivo APK generado

---

## 🚀 Instalación Rápida (Usuario Final)

Si solo quieres instalar la app en tu teléfono:

1. **Descarga el APK** desde las releases de GitHub
2. **Activa la instalación de apps desconocidas** en tu dispositivo:
   - Ve a Configuración → Seguridad
   - Activa "Fuentes desconocidas" o "Instalar apps desconocidas"
3. **Abre el archivo APK** descargado
4. **Toca "Instalar"** y espera a que termine
5. **Abre la app** desde tu cajón de aplicaciones

---

## 🛠️ Compilación desde Código Fuente

### Paso 1: Preparar el Proyecto

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd work-commute-tracker

# Instalar dependencias
npm install
```

### Paso 2: Construir la Aplicación Web

```bash
# Compilar el proyecto para producción
npm run build
```

Esto generará la carpeta `dist/` con los archivos optimizados.

### Paso 3: Configurar Android Studio

1. **Descarga Android Studio** desde https://developer.android.com/studio
2. **Instala Android Studio** siguiendo las instrucciones de tu sistema operativo
3. **Abre Android Studio** y completa la configuración inicial
4. **Instala el SDK de Android**:
   - Ve a Tools → SDK Manager
   - Marca "Android 13.0 (Tiramisu)" o superior
   - Marca "Android SDK Build-Tools"
   - Haz clic en "Apply" para descargar

5. **Configura las variables de entorno** (si no se configuraron automáticamente):

   **En Windows:**
   ```powershell
   setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
   setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools"
   ```

   **En macOS/Linux:**
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
   # o
   export ANDROID_HOME=$HOME/Android/Sdk  # Linux
   
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   ```

### Paso 4: Inicializar Capacitor (Solo Primera Vez)

```bash
# Inicializar Capacitor
npx cap init "Registro Traslados" "com.jasminez.traslados"

# Agregar la plataforma Android
npx cap add android
```

### Paso 5: Sincronizar y Compilar

```bash
# Sincronizar los archivos web con Android
npx cap sync android

# Abrir el proyecto en Android Studio
npx cap open android
```

### Paso 6: Compilar APK en Android Studio

Una vez que Android Studio se abra:

#### Opción A: APK de Debug (Pruebas)

1. En la barra de menú: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Espera a que termine la compilación
3. Haz clic en "locate" en la notificación para encontrar el APK
4. El APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Opción B: APK de Release (Producción)

1. **Generar un Keystore** (solo primera vez):
   ```bash
   keytool -genkey -v -keystore traslados-jasminez.keystore -alias traslados -keyalg RSA -keysize 2048 -validity 10000
   ```
   - Guarda la contraseña en un lugar seguro
   - Guarda el archivo `.keystore` de forma segura

2. **Configurar el signing** en `android/app/build.gradle`:
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               storeFile file("../../traslados-jasminez.keystore")
               storePassword "TU_CONTRASEÑA"
               keyAlias "traslados"
               keyPassword "TU_CONTRASEÑA"
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               ...
           }
       }
   }
   ```

3. En Android Studio: **Build → Generate Signed Bundle / APK**
4. Selecciona **APK**
5. Selecciona tu keystore y completa los datos
6. Selecciona **release** como build type
7. El APK estará en: `android/app/release/app-release.apk`

---

## 📱 Instalar en tu Dispositivo

### Método 1: Conexión USB

1. **Activa las Opciones de Desarrollador** en tu Android:
   - Ve a Configuración → Acerca del teléfono
   - Toca "Número de compilación" 7 veces
   - Regresa y entra a "Opciones de desarrollador"
   - Activa "Depuración USB"

2. **Conecta tu teléfono** a la computadora con USB

3. **Instala directamente** desde Android Studio:
   ```bash
   npx cap run android
   ```
   O desde la terminal:
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Método 2: Transferir APK

1. Copia el archivo APK a tu teléfono (por email, USB, Drive, etc.)
2. Abre el archivo desde tu teléfono
3. Acepta instalar desde fuentes desconocidas si se solicita
4. Instala la app

---

## 🔄 Actualizar la Aplicación

Cuando hagas cambios en el código:

```bash
# 1. Reconstruir el proyecto web
npm run build

# 2. Sincronizar con Android
npx cap sync android

# 3. Recompilar
# Opción A: Desde terminal
cd android && ./gradlew assembleDebug

# Opción B: Desde Android Studio
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

---

## 🐛 Solución de Problemas Comunes

### "SDK location not found"
```bash
# Crea el archivo android/local.properties con:
sdk.dir=/ruta/a/tu/Android/Sdk
```

### "Gradle build failed"
```bash
# Limpia el proyecto y reconstruye
cd android
./gradlew clean
./gradlew assembleDebug
```

### "Unable to load script from assets"
```bash
# Asegúrate de haber ejecutado:
npm run build
npx cap sync android
```

### La app se cierra inmediatamente
- Verifica los logs con: `npx cap run android -l`
- O desde Android Studio: View → Tool Windows → Logcat

### Problemas con permisos
- Verifica que `android/app/src/main/AndroidManifest.xml` tenga los permisos necesarios

---

## 📦 Estructura de Archivos

```
proyecto/
├── src/                          # Código fuente React
├── dist/                         # Build de producción (generado)
├── android/                      # Proyecto Android nativo (generado)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── res/             # Recursos (iconos, splash)
│   │   │   └── assets/          # Archivos web
│   │   └── build.gradle
│   └── build.gradle
├── capacitor.config.ts           # Configuración Capacitor
└── traslados-jasminez.keystore   # Keystore para firma (NO compartir)
```

---

## 🎨 Personalizar Iconos y Splash Screen

### Iconos de la App

1. Crea tus iconos en diferentes tamaños:
   - 36x36 (ldpi)
   - 48x48 (mdpi)
   - 72x72 (hdpi)
   - 96x96 (xhdpi)
   - 144x144 (xxhdpi)
   - 192x192 (xxxhdpi)

2. Colócalos en:
   ```
   android/app/src/main/res/
   ├── mipmap-ldpi/ic_launcher.png
   ├── mipmap-mdpi/ic_launcher.png
   ├── mipmap-hdpi/ic_launcher.png
   ├── mipmap-xhdpi/ic_launcher.png
   ├── mipmap-xxhdpi/ic_launcher.png
   └── mipmap-xxxhdpi/ic_launcher.png
   ```

### Splash Screen

1. Crea una imagen de splash (1080x1920 recomendado)
2. Colócala en: `android/app/src/main/res/drawable/splash.png`
3. Ajusta en `capacitor.config.ts` si es necesario

---

## 🔐 Seguridad

### ⚠️ NUNCA COMPARTAS:
- Tu archivo `.keystore`
- Las contraseñas del keystore
- El archivo `local.properties` con rutas absolutas

### ✅ BUENAS PRÁCTICAS:
- Mantén el `.keystore` en un lugar seguro fuera del repositorio
- Usa variables de entorno para contraseñas en CI/CD
- Agrega `*.keystore` y `local.properties` al `.gitignore`

---

## 📱 Publicar en Google Play Store (Opcional)

Si decides publicar la app:

1. **Crea una cuenta de desarrollador** en Google Play Console ($25 USD una sola vez)
2. **Genera un APK/AAB firmado** (preferiblemente AAB para Play Store):
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
3. **Sube el archivo** a Google Play Console
4. **Completa la información** de la app (descripciones, capturas, etc.)
5. **Envía para revisión**

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs: `npx cap run android -l`
2. Limpia y reconstruye: `npx cap sync android`
3. Consulta la documentación oficial: https://capacitorjs.com/docs/android

---

## 🎉 ¡Listo!

Tu app ya está lista para usar en Android. Disfruta registrando tus traslados en la Ruta Jasminez.

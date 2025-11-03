# Comandos Rápidos - Capacitor Android

## 🚀 Flujo Completo de Desarrollo

```bash
# 1. Instalar dependencias (primera vez)
npm install

# 2. Construir la app
npm run build

# 3. Sincronizar con Android
npx cap sync android

# 4. Abrir en Android Studio
npx cap open android

# 5. O ejecutar directamente en dispositivo
npx cap run android
```

---

## 🔄 Durante el Desarrollo

```bash
# Hacer cambios → Reconstruir → Sincronizar → Ejecutar
npm run build && npx cap sync android && npx cap run android

# Ver logs en tiempo real
npx cap run android -l
```

---

## 📦 Compilar APK

### Debug APK (para pruebas)
```bash
cd android
./gradlew assembleDebug
# APK en: android/app/build/outputs/apk/debug/app-debug.apk
```

### Release APK (para distribución)
```bash
cd android
./gradlew assembleRelease
# APK en: android/app/build/outputs/apk/release/app-release.apk
```

---

## 🛠️ Comandos Útiles

```bash
# Limpiar el proyecto
cd android && ./gradlew clean && cd ..

# Actualizar solo los assets web
npx cap copy android

# Ver dispositivos conectados
adb devices

# Instalar APK manualmente
adb install ruta/al/app.apk

# Desinstalar app del dispositivo
adb uninstall com.jasminez.traslados

# Ver logs en tiempo real
adb logcat | grep -i capacitor
```

---

## 🔧 Primera Configuración (Solo una vez)

```bash
# Instalar Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Inicializar proyecto
npx cap init "Registro Traslados" "com.jasminez.traslados"

# Agregar plataforma Android
npx cap add android

# Generar keystore para firma
keytool -genkey -v -keystore traslados-jasminez.keystore -alias traslados -keyalg RSA -keysize 2048 -validity 10000
```

---

## 📱 Instalación Directa

```bash
# Con dispositivo conectado por USB
adb install android/app/build/outputs/apk/debug/app-debug.apk

# O simplemente ejecutar
npx cap run android
```

---

## 🐛 Solución Rápida de Problemas

```bash
# Problema general → Limpiar todo y rehacer
npm run build
cd android && ./gradlew clean && cd ..
npx cap sync android
npx cap run android

# Si Android Studio no encuentra SDK
echo "sdk.dir=/ruta/a/Android/Sdk" > android/local.properties

# Verificar configuración de Capacitor
npx cap doctor
```

# 🚀 Guía de Inicio Rápido

## Para Instalar en tu Celular (Usuario Final)

### ✅ Lo que necesitas:
- Un celular Android (versión 7.0 o superior)
- 10-15 minutos
- Computadora con Android Studio (solo si vas a compilar)

### 📱 Opción 1: Instalar APK Pre-compilado (MÁS FÁCIL)

**Si alguien ya compiló el APK:**

1. Descarga el archivo `app-debug.apk` o `app-release.apk`
2. En tu celular, ve a **Configuración → Seguridad**
3. Activa **"Instalar apps de fuentes desconocidas"** o **"Fuentes desconocidas"**
4. Abre el archivo APK en tu celular
5. Toca **"Instalar"**
6. ¡Listo! Busca "Registro Traslados" en tu cajón de apps

---

## Para Desarrolladores

### 🛠️ Opción 2: Compilar desde Código

#### Requisitos Previos:

1. **Instala Node.js** (versión 18 o superior)
   - Descarga desde: https://nodejs.org/

2. **Instala Android Studio**
   - Descarga desde: https://developer.android.com/studio
   - Durante la instalación, acepta instalar el Android SDK

3. **Configura las Variables de Entorno**
   
   **Windows:**
   ```powershell
   setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
   ```
   
   **Mac/Linux:**
   ```bash
   echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc  # o ~/.bashrc
   source ~/.zshrc
   ```

#### Pasos de Compilación:

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd work-commute-tracker

# 2. Instalar dependencias
npm install

# 3. Construir la aplicación web
npm run build

# 4. Inicializar Capacitor (SOLO LA PRIMERA VEZ)
npx cap init "Registro Traslados" "com.jasminez.traslados"
npx cap add android

# 5. Sincronizar con Android
npx cap sync android

# 6. Abrir en Android Studio
npx cap open android
```

#### En Android Studio:

1. Espera a que Gradle termine de sincronizar
2. En la barra superior: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. Espera unos minutos
4. Cuando termine, haz clic en **"locate"** en la notificación
5. Encontrarás el APK en: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📲 Instalar en tu Celular

### Método 1: Por USB

1. Activa **"Depuración USB"** en tu celular:
   - Ve a **Configuración → Acerca del teléfono**
   - Toca **"Número de compilación"** 7 veces
   - Regresa y entra a **"Opciones de desarrollador"**
   - Activa **"Depuración USB"**

2. Conecta tu celular a la computadora

3. En la terminal:
   ```bash
   npm run android:run
   ```

### Método 2: Transferir APK

1. Copia el APK a tu celular (por WhatsApp, email, USB, etc.)
2. Abre el archivo desde tu celular
3. Instala la app

---

## 🔄 Actualizar la App

Si haces cambios en el código:

```bash
# Atajo rápido
npm run android:build

# O paso por paso:
npm run build
npx cap sync android
npx cap open android
# Luego en Android Studio: Build → Build APK
```

---

## ⚡ Scripts Útiles

```bash
npm run dev              # Servidor de desarrollo web
npm run build            # Compilar web para producción
npm run android:build    # Compilar web + sincronizar Android
npm run android:sync     # Solo sincronizar con Android
npm run android:open     # Abrir Android Studio
npm run android:run      # Instalar y ejecutar en dispositivo conectado
```

---

## 🐛 Problemas Comunes

### "No se encuentra Android SDK"
```bash
# Crea el archivo android/local.properties con:
sdk.dir=/ruta/a/tu/Android/Sdk

# Windows: C:\Users\TuUsuario\AppData\Local\Android\Sdk
# Mac: /Users/TuUsuario/Library/Android/sdk
# Linux: /home/TuUsuario/Android/Sdk
```

### "Gradle build failed"
```bash
cd android
./gradlew clean
cd ..
npm run android:sync
```

### La app no se instala en el celular
- Verifica que hayas activado "Fuentes desconocidas"
- Desinstala la versión anterior primero
- Intenta reiniciar el celular

### La app se cierra inmediatamente
```bash
# Ver los logs:
npm run android:run
# Los errores aparecerán en la consola
```

---

## 📚 Documentación Completa

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía completa de despliegue
- **[QUICK_COMMANDS.md](./QUICK_COMMANDS.md)** - Comandos de referencia rápida
- **[GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md)** - Automatización con CI/CD

---

## 💡 Consejos

✅ **Primera compilación**: Puede tomar 10-15 minutos en descargar todo
✅ **Siguientes compilaciones**: Toman solo 2-3 minutos
✅ **Desarrollo web primero**: Prueba cambios con `npm run dev` antes de compilar para Android
✅ **Guarda tu keystore**: Si planeas actualizar la app, necesitarás el mismo archivo `.keystore`

---

## 🎉 ¡Listo para Empezar!

Si todo salió bien, deberías tener la app instalada en tu celular. ¡A registrar traslados!

**¿Problemas?** Abre un issue en GitHub o consulta la documentación completa.

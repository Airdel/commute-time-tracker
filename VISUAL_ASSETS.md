# 🎨 Recursos Visuales para Android

Este documento describe los recursos visuales necesarios para personalizar la aplicación Android.

## 📱 Iconos de la Aplicación (Launcher Icons)

### Tamaños Requeridos

Los iconos de la app deben crearse en los siguientes tamaños:

| Densidad | Tamaño   | Ubicación                                    |
|----------|----------|----------------------------------------------|
| ldpi     | 36x36    | `android/app/src/main/res/mipmap-ldpi/`     |
| mdpi     | 48x48    | `android/app/src/main/res/mipmap-mdpi/`     |
| hdpi     | 72x72    | `android/app/src/main/res/mipmap-hdpi/`     |
| xhdpi    | 96x96    | `android/app/src/main/res/mipmap-xhdpi/`    |
| xxhdpi   | 144x144  | `android/app/src/main/res/mipmap-xxhdpi/`   |
| xxxhdpi  | 192x192  | `android/app/src/main/res/mipmap-xxxhdpi/`  |

### Diseño Recomendado

**Para la Ruta Jasminez:**

- **Elemento principal**: Icono de bus/camión estilizado
- **Color de fondo**: Azul primario `oklch(0.45 0.15 250)` 
- **Icono**: Blanco o amarillo/ámbar para contraste
- **Estilo**: Flat design, bordes redondeados
- **Elementos opcionales**: 
  - Silueta de un bus de frente
  - Ícono de reloj pequeño en la esquina (tema de tiempo)
  - Inicial "J" estilizada

### Herramientas para Generar Iconos

#### Opción 1: Android Studio Image Asset Studio (Recomendado)

1. En Android Studio, click derecho en `res` folder
2. **New → Image Asset**
3. Selecciona **Launcher Icons (Adaptive and Legacy)**
4. Sube tu imagen base (512x512 recomendado)
5. Ajusta el tamaño y padding
6. Click **Next** y **Finish**

#### Opción 2: Generadores Online

- **[Icon Kitchen](https://icon.kitchen/)** - Gratuito y fácil de usar
- **[App Icon Generator](https://www.appicon.co/)** - Genera todos los tamaños
- **[Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)** - Oficial de Google

#### Opción 3: Manual con Figma/Photoshop

1. Crea un canvas de 512x512px
2. Diseña tu icono con 10% de padding
3. Exporta en cada tamaño listado arriba
4. Guarda como PNG con transparencia
5. Nombra cada archivo `ic_launcher.png`
6. Coloca en sus respectivas carpetas

---

## 🌅 Splash Screen

### Configuración

El splash screen se muestra brevemente al abrir la app.

**Ubicación**: `android/app/src/main/res/drawable/splash.png`

**Tamaño recomendado**: 1080x1920 (portrait) o 1920x1080 (landscape)

### Diseño Recomendado

```
┌─────────────────┐
│                 │
│                 │
│     [LOGO]      │  ← Icono del bus (200x200)
│                 │
│  Registro de    │  ← Título
│   Traslados     │
│                 │
│   Jasminez      │  ← Subtítulo
│                 │
│                 │
└─────────────────┘
```

**Colores sugeridos**:
- Fondo: Blanco `#FFFFFF` o azul muy claro
- Logo: Azul primario
- Texto: Azul oscuro o gris

### Personalizar Splash en Capacitor

En `capacitor.config.ts`:

```typescript
plugins: {
  SplashScreen: {
    launchShowDuration: 2000,        // Duración en ms
    backgroundColor: "#FFFFFF",       // Color de fondo
    androidSplashResourceName: "splash",
    showSpinner: false,              // Sin spinner de carga
    androidScaleType: "CENTER_CROP", // Cómo escalar la imagen
  },
},
```

---

## 🎨 Colores del Sistema Android

### Archivo: `android/app/src/main/res/values/colors.xml`

Crea o edita este archivo para definir colores nativos:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Color primario de la app (barra de navegación en algunas versiones) -->
    <color name="colorPrimary">#5A6FC4</color>
    
    <!-- Versión oscura del color primario -->
    <color name="colorPrimaryDark">#3D4A8A</color>
    
    <!-- Color de acento (botones, links) -->
    <color name="colorAccent">#D6A84B</color>
    
    <!-- Color de fondo del splash -->
    <color name="splashBackground">#FFFFFF</color>
</resources>
```

---

## 📝 Strings de la App

### Archivo: `android/app/src/main/res/values/strings.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Registro Traslados</string>
    <string name="title_activity_main">Registro de Traslados - Jasminez</string>
    <string name="package_name">com.jasminez.traslados</string>
    <string name="custom_url_scheme">jasminez</string>
</resources>
```

---

## 🖼️ Estructura Completa de Recursos

```
android/app/src/main/res/
├── drawable/
│   └── splash.png                    # Splash screen
├── mipmap-ldpi/
│   └── ic_launcher.png              # 36x36
├── mipmap-mdpi/
│   └── ic_launcher.png              # 48x48
├── mipmap-hdpi/
│   └── ic_launcher.png              # 72x72
├── mipmap-xhdpi/
│   └── ic_launcher.png              # 96x96
├── mipmap-xxhdpi/
│   └── ic_launcher.png              # 144x144
├── mipmap-xxxhdpi/
│   └── ic_launcher.png              # 192x192
└── values/
    ├── colors.xml                    # Colores del sistema
    └── strings.xml                   # Textos de la app
```

---

## 🎯 Iconos Adaptativos (Android 8.0+)

Para Android 8.0 y superior, considera crear iconos adaptativos:

### Estructura

```
mipmap-anydpi-v26/
├── ic_launcher.xml
└── ic_launcher_round.xml

drawable/
├── ic_launcher_background.xml       # Fondo del icono
└── ic_launcher_foreground.xml       # Primer plano del icono
```

### Ejemplo `ic_launcher.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
```

**Ventaja**: Android puede aplicar diferentes formas (círculo, cuadrado, squircle) según el dispositivo.

---

## 🔧 Aplicar Cambios

Después de añadir o modificar recursos:

```bash
# Sincronizar los cambios
npx cap sync android

# Limpiar y reconstruir
cd android
./gradlew clean
./gradlew assembleDebug
```

---

## 📐 Plantilla de Diseño Figma (Opcional)

Puedes crear una plantilla con estos elementos:

1. **Canvas de 512x512** para icono base
2. **Grilla de seguridad**: 
   - Área de contenido: 432x432 (84% del total)
   - Padding: 40px en cada lado
3. **Canvas de 1080x1920** para splash
4. **Área segura central**: 1080x540 para contenido crítico

---

## ✨ Tips de Diseño

✅ **Mantén simplicidad**: Iconos muy detallados se ven mal en tamaños pequeños
✅ **Alto contraste**: Asegura que el icono sea visible en fondos claros y oscuros
✅ **Sin texto**: Evita texto pequeño en el icono, se vuelve ilegible
✅ **Prueba en dispositivo real**: Los iconos se ven diferente en pantalla real vs diseño
✅ **Consistencia**: Usa los mismos colores de tu paleta de la app

---

## 🎨 Recursos Externos

- **Iconos gratuitos de bus**: [Phosphor Icons](https://phosphoricons.com/) (ya instalado)
- **Colores de la app**: Ya definidos en el PRD
- **Fuente**: Inter (definida en tu proyecto)

---

## 🚀 Siguientes Pasos

1. Diseña tu icono de launcher (512x512)
2. Usa Image Asset Studio para generar todos los tamaños
3. Crea el splash screen (1080x1920)
4. Actualiza `colors.xml` y `strings.xml`
5. Sincroniza: `npx cap sync android`
6. Compila y prueba en dispositivo real

¡Tu app lucirá profesional con estos recursos visuales personalizados!

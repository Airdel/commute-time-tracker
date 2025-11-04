# Migración de Capacitor a PWA

## 🔄 Cambios Realizados

Esta aplicación ha sido migrada de **Capacitor** (app nativa Android) a **PWA** (Progressive Web App) para resolver problemas de sincronización y simplificar el desarrollo.

## ❌ Problemas con Capacitor

1. **Sincronización Compleja**: Requería manejo manual de sincronización entre web y móvil
2. **Compilación Pesada**: Necesitaba Android Studio y compilar APK para cada actualización
3. **Actualizaciones Lentas**: Los usuarios debían descargar e instalar nuevas versiones manualmente
4. **Desarrollo Fragmentado**: Código separado para web y móvil
5. **Dependencias de Plataforma**: Requería SDKs específicos de Android

## ✅ Ventajas de PWA

1. **Sincronización Automática**: Los datos se sincronizan en tiempo real sin código adicional
2. **Sin Compilación**: No requiere Android Studio ni compilar APKs
3. **Actualizaciones Instantáneas**: Las actualizaciones se despliegan automáticamente
4. **Código Unificado**: Una sola base de código para todas las plataformas
5. **Multiplataforma**: Funciona en Android, iOS y Desktop
6. **Instalable**: Se puede instalar como app desde el navegador
7. **Offline First**: Funciona sin conexión usando Service Workers
8. **Ligera**: No requiere descargar ni instalar desde tiendas de apps

## 🛠️ Implementación Técnica

### Archivos Agregados

1. **`/public/manifest.json`**
   - Define la configuración de la PWA
   - Nombre, iconos, colores del tema
   - Modo de visualización standalone

2. **`/public/sw.js`**
   - Service Worker para caché y offline
   - Estrategia network-first con fallback a caché
   - Manejo de actualizaciones automáticas

3. **`/public/icon-192.svg` y `/public/icon-512.svg`**
   - Iconos de la aplicación en formato SVG
   - Escalables y ligeros
   - Se pueden reemplazar con PNG si se desea

4. **`/src/components/InstallPrompt.tsx`**
   - Componente para mostrar banner de instalación
   - Se muestra automáticamente cuando la PWA es instalable
   - Puede ser descartado por el usuario

5. **`/src/components/UpdatePrompt.tsx`**
   - Componente para notificar actualizaciones disponibles
   - Permite al usuario actualizar la app instantáneamente
   - Verifica actualizaciones cada minuto

6. **`/PWA_GUIDE.md`**
   - Guía completa de instalación y uso de la PWA
   - Instrucciones para Android, iOS y Desktop

### Cambios en Archivos Existentes

1. **`/index.html`**
   - Agregado `<link rel="manifest">` para el manifest
   - Agregadas meta tags para PWA (theme-color, apple-mobile-web-app)
   - Script de registro del Service Worker

2. **`/src/App.tsx`**
   - Importados componentes `InstallPrompt` y `UpdatePrompt`
   - Agregados al render para mostrar banners

3. **`/PRD.md`**
   - Actualizada sección de Deployment Strategy
   - Cambiado de Capacitor a PWA

4. **`/README.md`**
   - Actualizadas instrucciones de instalación
   - Agregada sección de ventajas de PWA
   - Instrucciones de instalación por plataforma

## 📱 Cómo Usar la PWA

### Para Desarrolladores

```bash
# Desarrollo local (igual que antes)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Deploy a GitHub Pages o cualquier servidor estático
# La PWA funcionará automáticamente con HTTPS
```

### Para Usuarios

**Android:**
1. Abre la app en Chrome
2. Toca "Instalar aplicación" en el menú
3. La app aparecerá en tu pantalla de inicio

**iOS:**
1. Abre la app en Safari
2. Toca "Compartir" → "Añadir a pantalla de inicio"
3. La app aparecerá en tu pantalla de inicio

**Desktop:**
1. Abre la app en Chrome/Edge
2. Clic en el icono de instalación (+) en la barra de direcciones
3. La app se abrirá en su propia ventana

## 🔍 Comparación Técnica

| Característica | Capacitor | PWA |
|---------------|-----------|-----|
| Instalación | Play Store / APK | Navegador |
| Actualizaciones | Manual (descarga APK) | Automática (segundo plano) |
| Offline | Requiere código nativo | Service Worker |
| Sincronización | Manual (código extra) | Automática (useKV) |
| Plataformas | Android (necesita código) | Android/iOS/Desktop (mismo código) |
| Desarrollo | Android Studio requerido | Solo navegador |
| Build | Gradle + Android SDK | Vite |
| Tamaño | ~10-20 MB | ~2-5 MB (caché) |
| Notificaciones | Nativas | Web Push API |
| Permisos | Manifest Android | Solicitar al usar |

## 🚀 Próximos Pasos

1. **Generar Iconos Reales**: Reemplazar los SVGs placeholder con iconos PNG reales
2. **Probar en Dispositivos**: Instalar y probar en Android, iOS y Desktop
3. **Optimizar Caché**: Ajustar estrategia de caché según necesidades
4. **Add to Home Screen**: Probar flujo de instalación en diferentes navegadores
5. **Performance**: Medir y optimizar usando Lighthouse

## 📚 Recursos

- [PWA Guide](./PWA_GUIDE.md) - Guía completa de instalación
- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev: PWA](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## ⚠️ Archivos Obsoletos (Opcional: Eliminar)

Si decides remover completamente Capacitor, puedes eliminar:

- `capacitor.config.ts`
- `android/` (directorio completo)
- `ios/` (si existe)
- Dependencias de Capacitor en `package.json`:
  - `@capacitor/core`
  - `@capacitor/cli`
  - `@capacitor/android`

**Nota**: Por ahora estos archivos permanecen por compatibilidad, pero no son necesarios para la PWA.

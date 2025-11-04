# PWA - Progressive Web App

Esta aplicación ahora está configurada como PWA (Progressive Web App), lo que significa que:

## ✨ Beneficios

1. **Instalable**: Los usuarios pueden instalar la app en sus dispositivos móviles o desktop directamente desde el navegador
2. **Funciona Offline**: La aplicación funciona sin conexión a internet usando caché
3. **Sincronización Automática**: Los datos se sincronizan automáticamente cuando hay conexión
4. **Actualizaciones Automáticas**: La app se actualiza automáticamente en segundo plano
5. **Experiencia Nativa**: Se ve y funciona como una app nativa

## 📱 Instalación en Dispositivos

### Android (Chrome/Edge)
1. Abre la aplicación en Chrome o Edge
2. Toca el menú (⋮) en la esquina superior derecha
3. Selecciona "Instalar aplicación" o "Añadir a pantalla de inicio"
4. Confirma la instalación

### iOS (Safari)
1. Abre la aplicación en Safari
2. Toca el botón de compartir (⬆️)
3. Desplázate y selecciona "Añadir a pantalla de inicio"
4. Toca "Añadir"

### Desktop (Chrome/Edge)
1. Abre la aplicación en Chrome o Edge
2. Busca el icono de instalación (+) en la barra de direcciones
3. Haz clic en "Instalar"

## 🔧 Características Técnicas

- **Service Worker**: Maneja el caché y las actualizaciones automáticas
- **Manifest**: Define la apariencia y comportamiento de la app
- **Cache Strategy**: Network-first con fallback a caché
- **Offline Support**: Todas las funcionalidades principales funcionan sin conexión
- **Auto-sync**: Los datos se sincronizan cuando se recupera la conexión

## 🚀 Sin Capacitor

Ya no es necesario usar Capacitor para tener una app móvil. La PWA ofrece:

- ✅ Instalación desde navegador (sin Play Store/App Store)
- ✅ Sincronización automática de datos
- ✅ Funciona offline
- ✅ Actualizaciones automáticas
- ✅ Notificaciones (si se necesitan en el futuro)
- ✅ Sin problemas de sincronización entre dispositivos

## 📋 Archivos Generados

- `/public/manifest.json`: Configuración de la PWA
- `/public/sw.js`: Service Worker para caché y offline
- `/public/icon-192.png`: Icono pequeño (por generar)
- `/public/icon-512.png`: Icono grande (por generar)

## 🎨 Próximos Pasos

Para tener una PWA completa, necesitas:

1. **Generar íconos**: Crea iconos de 192x192 y 512x512 píxeles con el logo de la app
2. **Probar instalación**: Abre la app en un dispositivo móvil y prueba instalarla
3. **Verificar offline**: Desconecta internet y verifica que la app funcione

## 💡 Notas

- La PWA funciona mejor con HTTPS (GitHub Pages ya usa HTTPS)
- Los datos se guardan localmente y se sincronizan automáticamente
- No hay límites de tamaño de almacenamiento significativos (varios MB disponibles)
- La app se actualiza automáticamente cuando publicas cambios

# 🚌 Registro de Traslados - Jasminez

Aplicación PWA (Progressive Web App) para registrar y analizar tiempos de traslado en la Ruta Jasminez en Tepic, Nayarit.

## ✨ Características

- 📝 **Registro Rápido**: Cronómetro integrado para registrar traslados en tiempo real
- 📊 **Estadísticas Inteligentes**: Analiza tus patrones de traslado con gráficas visuales
- 🔮 **Predicción de Salidas**: Sistema que sugiere cuándo salir basado en tu historial
- 🛣️ **Múltiples Rutas**: Gestiona diferentes rutas de transporte (camión y motoneta)
- 🎯 **Tipos Personalizables**: Define tus propios tipos de traslados (trabajo, escuela, etc.)
- 📱 **Historial Completo**: Revisa, edita y elimina traslados pasados
- 🌓 **Modo Oscuro**: Interfaz adaptable a tus preferencias
- 🔄 **Sincronización Automática**: Datos sincronizados en tiempo real entre todos tus dispositivos
- 📲 **PWA Instalable**: Instala como app en cualquier dispositivo (Android, iOS, Desktop)
- 🔌 **Funciona Offline**: Usa la app sin conexión a internet
- 🔐 **Inicio de Sesión con GitHub**: Accede a tus datos desde cualquier dispositivo

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 📲 Instalar como App (PWA)

**¡Ya no necesitas compilar un APK!** Esta aplicación es una PWA que puedes instalar directamente desde tu navegador.

### En Android (Chrome/Edge)
1. Abre la aplicación en Chrome o Edge
2. Toca el menú (⋮) en la esquina superior derecha
3. Selecciona "Instalar aplicación" o "Añadir a pantalla de inicio"
4. Confirma la instalación
5. ¡Listo! La app estará en tu pantalla de inicio

### En iOS (Safari)
1. Abre la aplicación en Safari
2. Toca el botón de compartir (⬆️)
3. Desplázate y selecciona "Añadir a pantalla de inicio"
4. Toca "Añadir"
5. ¡Listo! La app estará en tu pantalla de inicio

### En Desktop (Chrome/Edge)
1. Abre la aplicación en Chrome o Edge
2. Busca el icono de instalación (+) en la barra de direcciones
3. Haz clic en "Instalar"
4. ¡Listo! La app se abrirá en su propia ventana

**Ver [PWA_GUIDE.md](./PWA_GUIDE.md) para guía detallada de instalación**

## ✅ Ventajas de la PWA sobre Capacitor

- ✅ **Sin compilación**: No necesitas Android Studio ni compilar APKs
- ✅ **Actualizaciones instantáneas**: Los cambios se reflejan automáticamente
- ✅ **Sin problemas de sincronización**: Los datos se sincronizan perfectamente
- ✅ **Multiplataforma**: Funciona en Android, iOS y Desktop con el mismo código
- ✅ **Instalable**: Se instala como app nativa desde el navegador
- ✅ **Offline**: Funciona sin conexión a internet
- ✅ **Actualización automática**: Se actualiza en segundo plano

## 🛠️ Tecnologías

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Iconos**: Phosphor Icons
- **Gráficas**: Recharts
- **PWA**: Service Worker + Web App Manifest
- **Build**: Vite
- **Persistencia**: Spark KV Storage

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes shadcn
│   ├── LoggerTab.tsx   # Pestaña de registro
│   ├── HistoryTab.tsx  # Pestaña de historial
│   ├── StatsTab.tsx    # Pestaña de estadísticas
│   ├── SettingsTab.tsx # Pestaña de ajustes
│   ├── InstallPrompt.tsx  # Prompt de instalación PWA
│   └── UpdatePrompt.tsx   # Notificación de actualizaciones
├── types/              # Tipos TypeScript
├── lib/                # Utilidades
├── hooks/              # Hooks personalizados
└── App.tsx             # Componente principal
public/
├── manifest.json       # Configuración PWA
├── sw.js              # Service Worker
├── icon-192.svg       # Icono pequeño
└── icon-512.svg       # Icono grande
```

## 🎯 Uso

1. **Registrar un Traslado**:
   - Selecciona el tipo de traslado y ruta
   - Presiona "Iniciar Viaje"
   - El cronómetro comenzará automáticamente
   - Al llegar, presiona "Terminar Viaje"
   - Añade notas opcionales y guarda

2. **Ver Predicciones**:
   - La tarjeta de predicción te sugiere cuándo salir
   - Basada en el promedio de tus traslados históricos
   - Se actualiza automáticamente con cada nuevo registro

3. **Analizar Estadísticas**:
   - Ve a la pestaña "Estadísticas"
   - Filtra por tipo de traslado o ruta
   - Visualiza tendencias y promedios

4. **Gestionar Configuración**:
   - Añade o edita rutas personalizadas
   - Crea tipos de traslados personalizados
   - Configura predicciones de salida
   - Inicia sesión con GitHub para sincronización automática

5. **Sincronizar entre Dispositivos**:
   - Ve a la pestaña "Ajustes"
   - Haz clic en "Iniciar sesión con GitHub"
   - Autoriza la aplicación
   - Abre la app en cualquier otro dispositivo e inicia sesión con la misma cuenta
   - ¡Tus datos se sincronizarán automáticamente!
   - Ver [SYNC_GUIDE.md](./SYNC_GUIDE.md) para guía detallada

6. **Instalar como App**:
   - El navegador te mostrará automáticamente un banner para instalar
   - O sigue las instrucciones de instalación según tu dispositivo
   - Una vez instalada, la app funcionará offline y recibirá actualizaciones automáticas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

---

**Desarrollado con ❤️ para la comunidad de usuarios de la Ruta Jasminez en Tepic, Nayarit**

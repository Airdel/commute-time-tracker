# 🚌 Registro de Traslados - Jasminez

Aplicación móvil para registrar y analizar tiempos de traslado en la Ruta Jasminez en Tepic, Nayarit.

## ✨ Características

- 📝 **Registro Rápido**: Cronómetro integrado para registrar traslados en tiempo real
- 📊 **Estadísticas Inteligentes**: Analiza tus patrones de traslado con gráficas visuales
- 🔮 **Predicción de Salidas**: Sistema que sugiere cuándo salir basado en tu historial
- 🛣️ **Múltiples Rutas**: Gestiona diferentes rutas de transporte (camión y motoneta)
- 🎯 **Tipos Personalizables**: Define tus propios tipos de traslados (trabajo, escuela, etc.)
- 📱 **Historial Completo**: Revisa, edita y elimina traslados pasados
- 🌓 **Modo Oscuro**: Interfaz adaptable a tus preferencias
- 🔄 **Sincronización Multiplataforma**: Exporta e importa datos entre web y móvil

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

### 📱 Compilar para Android

Esta app usa **Capacitor** para convertirse en una aplicación Android nativa.

**Guía completa**: Ver [DEPLOYMENT.md](./DEPLOYMENT.md)

**Comandos rápidos**:

```bash
# 1. Construir la aplicación web
npm run build

# 2. Sincronizar con Android
npx cap sync android

# 3. Abrir en Android Studio
npx cap open android

# 4. O ejecutar directamente
npx cap run android
```

Ver [QUICK_COMMANDS.md](./QUICK_COMMANDS.md) para más comandos útiles.

## 📦 Instalación en tu Teléfono

### Opción 1: Descargar APK (Más Fácil)
1. Ve a [Releases](../../releases) en GitHub
2. Descarga el archivo `app-release.apk`
3. Instala en tu dispositivo Android
4. Acepta instalar desde fuentes desconocidas si se solicita

### Opción 2: Compilar desde Código
Ver la [Guía de Despliegue Completa](./DEPLOYMENT.md)

## 🛠️ Tecnologías

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Iconos**: Phosphor Icons
- **Gráficas**: Recharts
- **Mobile**: Capacitor
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
│   └── SettingsTab.tsx # Pestaña de ajustes
├── types/              # Tipos TypeScript
├── lib/                # Utilidades
├── hooks/              # Hooks personalizados
└── App.tsx             # Componente principal
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
   - Exporta/importa tus datos para sincronización

5. **Sincronizar entre Dispositivos**:
   - En Ajustes, usa "Exportar datos" para guardar un respaldo
   - Transfiere el archivo JSON a otro dispositivo
   - Usa "Importar datos" para cargar tus datos
   - Ver [SYNC_GUIDE.md](./SYNC_GUIDE.md) para guía detallada

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

# 📱 Instalación de la App Móvil - Registro de Traslados

## ✨ Sincronización Multiplataforma en Tiempo Real

Tu aplicación **ya está configurada** para funcionar con sincronización en tiempo real entre:
- 🌐 Sitio web (navegador)
- 📱 Aplicación móvil (Android/iOS)
- 💻 Múltiples dispositivos
- ⚡ Sincronización automática e instantánea

Todos tus traslados, configuraciones y estadísticas se sincronizan automáticamente entre todos tus dispositivos donde inicies sesión con tu cuenta de GitHub.

---

## 📲 Cómo Instalar la App en tu Celular

### Opción 1: Instalar como PWA (Progressive Web App)

La forma más rápida - funciona en Android e iOS:

#### En Android (Chrome):
1. Abre el sitio web en Chrome
2. Toca el menú (⋮) en la esquina superior derecha
3. Selecciona **"Agregar a pantalla de inicio"** o **"Instalar aplicación"**
4. Dale un nombre y confirma
5. ¡Listo! La app aparecerá en tu pantalla de inicio

#### En iOS (Safari):
1. Abre el sitio web en Safari
2. Toca el botón de compartir (□↑) en la parte inferior
3. Desplázate y toca **"Agregar a pantalla de inicio"**
4. Dale un nombre y toca "Agregar"
5. ¡Listo! La app aparecerá en tu pantalla de inicio

### Opción 2: Compilar App Nativa con Capacitor (Android/iOS)

Tu proyecto ya tiene Capacitor instalado y configurado. Para crear una app nativa:

#### Para Android:

```bash
# 1. Construir la aplicación web
npm run build

# 2. Sincronizar con Capacitor
npx cap sync android

# 3. Abrir en Android Studio
npx cap open android

# 4. En Android Studio:
#    - Conecta tu dispositivo Android o inicia un emulador
#    - Click en el botón "Run" (▶️)
#    - La app se instalará en tu dispositivo
```

#### Para iOS (requiere Mac):

```bash
# 1. Construir la aplicación web
npm run build

# 2. Sincronizar con Capacitor
npx cap sync ios

# 3. Abrir en Xcode
npx cap open ios

# 4. En Xcode:
#    - Conecta tu iPhone o inicia un simulador
#    - Click en el botón "Play" (▶️)
#    - La app se instalará en tu dispositivo
```

---

## 🔄 Cómo Funciona la Sincronización

### Sincronización Automática
Los siguientes datos se sincronizan **automáticamente** entre todos tus dispositivos:

✅ **Traslados registrados** - Todos tus viajes con horarios y duraciones
✅ **Estado del cronómetro** - Si inicias un viaje en un dispositivo, continúa en otro
✅ **Rutas y métodos de transporte** - Jasminez, Motoneta Personal, etc.
✅ **Tipos de traslado** - Hacia el trabajo, Desde el trabajo
✅ **Configuración de predicciones** - Hora de entrada, minutos de buffer, etc.

### Ejemplo de Uso Multiplataforma

**Escenario 1: Iniciar en móvil, terminar en web**
1. Por la mañana, abres la app en tu celular
2. Tocas "Hacia el trabajo" e inicias el cronómetro
3. El cronómetro corre durante tu viaje
4. Llegas al trabajo y abres la web en tu computadora
5. El cronómetro **sigue corriendo** en la web
6. Detienes el cronómetro desde la web
7. El traslado se guarda y aparece **en ambos dispositivos**

**Escenario 2: Registrar en cualquier lugar**
1. Registras traslados en tu celular durante la semana
2. El fin de semana abres la web en tu tablet
3. **Todos los traslados están ahí** - sin hacer nada extra
4. Puedes ver estadísticas, editar o eliminar traslados
5. Los cambios se reflejan **inmediatamente** en todos tus dispositivos

**Escenario 3: Múltiples dispositivos simultáneamente**
1. Tienes la app abierta en tu celular y en tu computadora
2. Registras un traslado en el celular
3. **En menos de 1 segundo**, el traslado aparece en la computadora
4. Ambas apps se mantienen sincronizadas en tiempo real

---

## 🔐 Inicio de Sesión y Seguridad

- Tu cuenta de GitHub es la llave para acceder a tus datos
- Solo tú puedes ver y modificar tus traslados
- Los datos se encriptan y se almacenan de forma segura
- Al cerrar sesión en un dispositivo, los datos locales se limpian
- Al volver a iniciar sesión, todos tus datos regresan

---

## ⚠️ Requisitos

Para que la sincronización funcione correctamente:

1. **Debes iniciar sesión** con tu cuenta de GitHub en cada dispositivo
2. **Conexión a internet** - La sincronización requiere conexión (los datos se guardan localmente y se sincronizan cuando hay conexión)
3. **Misma cuenta** - Usa la misma cuenta de GitHub en todos los dispositivos

---

## 🎯 Ventajas de Usar la App Móvil

### PWA (Agregar a pantalla de inicio):
✅ Instalación instantánea, sin tiendas de apps
✅ Actualizaciones automáticas
✅ Funciona offline (con limitaciones)
✅ Icono en la pantalla de inicio
✅ Experiencia de pantalla completa
✅ Notificaciones push (si se implementan en el futuro)

### App Nativa (Capacitor):
✅ Todo lo anterior, más:
✅ Mejor rendimiento
✅ Acceso completo a funciones del dispositivo
✅ Publicable en Google Play Store / Apple App Store
✅ Mejor integración con el sistema operativo

---

## 🆘 Solución de Problemas

### "No veo mis datos en el otro dispositivo"
- ✅ Verifica que iniciaste sesión con la misma cuenta de GitHub
- ✅ Asegúrate de tener conexión a internet
- ✅ Espera unos segundos - la sincronización es rápida pero no instantánea
- ✅ Recarga la página/app

### "El cronómetro no se sincroniza"
- ✅ El cronómetro debe estar activo en solo un dispositivo a la vez
- ✅ Si tienes problemas, detén el cronómetro y reinícialo
- ✅ Los traslados completados siempre se sincronizan correctamente

### "La app no se instala en mi celular"
- ✅ Para PWA: Asegúrate de usar Chrome (Android) o Safari (iOS)
- ✅ Para app nativa: Verifica los requisitos de Capacitor en su documentación

---

## 📚 Recursos Adicionales

- [Documentación de Capacitor](https://capacitorjs.com/docs)
- [Guía de PWA](https://web.dev/progressive-web-apps/)
- [Configuración de Capacitor en este proyecto](./capacitor.config.ts)

---

## 🎉 ¡Disfruta tu App Multiplataforma!

Ahora puedes registrar tus traslados desde cualquier dispositivo y tener toda tu información siempre disponible y actualizada. La tecnología de sincronización en tiempo real hace que tu experiencia sea fluida sin importar dónde estés.

**¿Preguntas o problemas?** Abre un issue en el repositorio o contacta al desarrollador.

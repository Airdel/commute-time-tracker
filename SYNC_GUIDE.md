# Guía de Sincronización Multiplataforma

Esta guía explica cómo sincronizar tus datos de traslados entre la versión web y la aplicación móvil Android.

## 🔐 Inicio de sesión con GitHub

Para poder sincronizar tus datos automáticamente entre dispositivos, necesitas iniciar sesión con tu cuenta de GitHub.

### Primera vez que usas la app:

1. Abre la aplicación (web o móvil)
2. Ve a la pestaña **"Ajustes"**
3. En la parte superior verás una tarjeta que indica **"Sin sesión activa"**
4. Haz clic en **"Iniciar sesión con GitHub"**
5. Autoriza la aplicación en GitHub
6. ¡Listo! Ahora tu cuenta está conectada

### ¿Ya tienes datos registrados?

Si ya tienes traslados registrados en el sitio web y ahora quieres verlos en tu móvil:

1. **En el dispositivo con los datos (ej: tu computadora):**
   - Abre la app en tu navegador
   - Inicia sesión con GitHub (si aún no lo has hecho)
   - Tus datos locales se sincronizarán automáticamente a tu cuenta

2. **En tu nuevo dispositivo (ej: tu celular):**
   - Instala la app móvil
   - Abre la app e inicia sesión con la **misma cuenta de GitHub**
   - Todos tus datos aparecerán automáticamente

## 🔄 Cómo funciona la sincronización

Una vez que inicies sesión con GitHub, la sincronización es **completamente automática**:

- ✅ **Tiempo real**: Los cambios se sincronizan en menos de 1 segundo
- ✅ **Bidireccional**: Funciona de web → móvil y de móvil → web
- ✅ **Automática**: No necesitas hacer nada, todo se guarda solo
- ✅ **Funciona offline**: Los datos se guardan localmente y se sincronizan cuando tengas conexión
- ✅ **Segura**: Solo tú puedes acceder a tus datos con tu cuenta de GitHub

### Datos que se sincronizan:

- ✅ Todos los traslados registrados
- ✅ Todas las rutas personalizadas
- ✅ Todos los tipos de traslado
- ✅ Configuración de predicción
- ✅ Estado del cronómetro (si está activo)

## 📱 Usar la app en múltiples dispositivos

### Escenario 1: Ya usas la app en la web, quieres instalarla en tu móvil

1. En la web, ve a **Ajustes** e inicia sesión con GitHub
2. Instala la app en tu móvil (ver [INSTALACION_MOVIL.md](INSTALACION_MOVIL.md))
3. Abre la app móvil
4. Ve a **Ajustes** e inicia sesión con la **misma cuenta de GitHub**
5. ¡Todos tus datos aparecerán automáticamente!

### Escenario 2: Ya usas la app en el móvil, quieres usarla en la web

1. En el móvil, ve a **Ajustes** e inicia sesión con GitHub
2. Abre un navegador en tu computadora
3. Ve a la URL de la app web
4. Ve a **Ajustes** e inicia sesión con la **misma cuenta de GitHub**
5. ¡Todos tus datos aparecerán automáticamente!

### Escenario 3: Usas múltiples dispositivos

Puedes usar la app en tantos dispositivos como quieras:
- Computadora del trabajo
- Computadora de casa
- Celular
- Tablet

Solo asegúrate de iniciar sesión con la **misma cuenta de GitHub** en todos ellos.

## 💡 Ventajas de la sincronización automática

### Antes (sincronización manual):
❌ Tenías que exportar manualmente un archivo  
❌ Transferir el archivo entre dispositivos  
❌ Importar el archivo en cada dispositivo  
❌ Perder datos si olvidabas sincronizar  

### Ahora (sincronización automática):
✅ Inicias sesión una sola vez en cada dispositivo  
✅ Todo se sincroniza automáticamente  
✅ Siempre tienes tus datos al día  
✅ Nunca pierdes información  

## 🔒 Seguridad y privacidad

- **Tus datos son privados**: Solo tú puedes acceder a ellos con tu cuenta de GitHub
- **Cifrado**: Los datos se transmiten de forma segura
- **Sin terceros**: Los datos solo se comparten entre tus propios dispositivos
- **Control total**: Puedes revocar el acceso en cualquier momento desde GitHub

## 📤 Respaldo manual (opcional)

Aunque la sincronización automática mantiene tus datos seguros, puedes crear respaldos manuales adicionales:

### Exportar datos:
1. Ve a **Ajustes**
2. En la sección **"Respaldo Manual"**, haz clic en **"Exportar respaldo"**
3. Se descargará un archivo JSON con todos tus datos

### Importar datos:
1. Ve a **Ajustes**
2. En la sección **"Respaldo Manual"**, haz clic en **"Restaurar desde respaldo"**
3. Selecciona el archivo JSON
4. Confirma que deseas reemplazar tus datos actuales

⚠️ **Importante**: Al importar un respaldo, los datos actuales serán reemplazados completamente.

## 🆘 Solución de problemas

### "Sin sesión activa" en Ajustes
- Necesitas iniciar sesión con GitHub para sincronizar datos
- Haz clic en "Iniciar sesión con GitHub" en la tarjeta de estado

### No veo mis datos en un nuevo dispositivo
1. Verifica que hayas iniciado sesión con la **misma cuenta de GitHub** en ambos dispositivos
2. Asegúrate de tener conexión a internet
3. Espera unos segundos para que se complete la sincronización
4. Refresca la app (cierra y abre nuevamente)

### Mis datos no se sincronizan
1. Verifica tu conexión a internet
2. Asegúrate de haber iniciado sesión en todos los dispositivos
3. Ve a **Ajustes** y verifica que aparezca tu nombre de usuario de GitHub
4. Si el problema persiste, intenta cerrar sesión y volver a iniciar

### Quiero usar diferentes cuentas en diferentes dispositivos
- Cada cuenta de GitHub tendrá su propio conjunto de datos independiente
- Los datos no se comparten entre diferentes cuentas
- Asegúrate de usar la misma cuenta si quieres los mismos datos

## 📊 Indicador de sincronización

En la parte superior derecha de la app verás un indicador que muestra el estado de sincronización:

- 🟢 **Verde con palomita**: Datos sincronizados correctamente
- 🟡 **Amarillo con reloj**: Sincronizando datos
- 🔴 **Rojo con advertencia**: Error de sincronización (verifica tu conexión)

## 🎯 Consejos

- **Primera vez**: Inicia sesión en el dispositivo que tiene más datos registrados
- **Respaldos periódicos**: Aunque la sincronización es automática, es buena idea exportar un respaldo manual cada mes
- **Cambio de dispositivo**: Si cambias de celular o computadora, solo inicia sesión con tu cuenta de GitHub en el nuevo dispositivo
- **Sin internet**: La app funciona offline, los datos se sincronizarán automáticamente cuando te conectes

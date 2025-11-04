# Guía de Sincronización Multiplataforma

Esta guía explica cómo sincronizar tus datos de traslados entre la versión web y la aplicación móvil Android.

## 🔄 Cómo funciona la sincronización

Los datos de la aplicación se almacenan localmente en cada dispositivo:
- **En la web**: Los datos se guardan en el almacenamiento local de tu navegador
- **En la app móvil**: Los datos se guardan en el almacenamiento interno de la app

Para tener los mismos datos en ambos lugares, necesitas **exportar** desde un dispositivo e **importar** en el otro.

## 📤 Exportar datos

### Desde la Web:
1. Abre la aplicación en tu navegador
2. Ve a la pestaña **"Ajustes"**
3. En la sección **"Sincronización de datos"**, haz clic en **"Exportar datos"**
4. Se descargará un archivo JSON con nombre `traslados-backup-YYYY-MM-DD.json`
5. Guarda este archivo en un lugar accesible (Google Drive, correo, etc.)

### Desde la App Móvil:
1. Abre la app en tu teléfono Android
2. Ve a la pestaña **"Ajustes"**
3. En la sección **"Sincronización de datos"**, toca **"Exportar datos"**
4. El archivo se descargará en tu carpeta de Descargas
5. Puedes compartir el archivo usando el gestor de archivos

## 📥 Importar datos

### En la Web:
1. Abre la aplicación en tu navegador
2. Ve a la pestaña **"Ajustes"**
3. En la sección **"Sincronización de datos"**, haz clic en **"Importar datos"**
4. Selecciona el archivo JSON que exportaste previamente
5. Confirma que deseas reemplazar tus datos actuales
6. ¡Listo! Tus datos están sincronizados

### En la App Móvil:
1. Asegúrate de tener el archivo JSON en tu teléfono
2. Abre la app
3. Ve a la pestaña **"Ajustes"**
4. En la sección **"Sincronización de datos"**, toca **"Importar datos"**
5. Selecciona el archivo desde tu gestor de archivos
6. Confirma que deseas reemplazar tus datos actuales
7. ¡Listo! Tus datos están sincronizados

## ⚠️ Consideraciones importantes

### Datos incluidos en la exportación:
- ✅ Todos los traslados registrados
- ✅ Todas las rutas personalizadas
- ✅ Todos los tipos de traslado
- ✅ Configuración de predicción
- ✅ Estado del cronómetro (si está activo)

### Al importar:
- ⚠️ **Los datos actuales serán reemplazados completamente**
- ⚠️ Esta acción no se puede deshacer
- ⚠️ Asegúrate de exportar tus datos actuales antes si quieres conservarlos

## 🔄 Flujo de trabajo recomendado

### Opción 1: Web como principal
1. Registra principalmente en la web
2. Periódicamente exporta los datos
3. Importa en tu móvil para consultar en movimiento

### Opción 2: Móvil como principal
1. Registra principalmente en la app móvil
2. Periódicamente exporta los datos
3. Importa en la web para análisis más detallado

### Opción 3: Uso mixto
1. Usa ambas plataformas según convenga
2. Al final del día/semana, decide cuál tiene los datos más completos
3. Exporta desde ese dispositivo
4. Importa en el otro dispositivo

## 💡 Consejos

- **Respalda regularmente**: Exporta tus datos semanalmente como respaldo de seguridad
- **Nombre descriptivo**: Renombra los archivos con información útil (ej: `traslados-enero-2024.json`)
- **Usa la nube**: Guarda los respaldos en Google Drive, Dropbox o similar para acceso fácil
- **Antes de actualizar**: Exporta tus datos antes de actualizar la app o cambiar de dispositivo

## 🆘 Solución de problemas

### "Error al importar datos"
- Verifica que el archivo sea un JSON válido
- Asegúrate de usar un archivo exportado desde esta app
- Intenta exportar nuevamente desde el dispositivo origen

### "El archivo no se descarga"
- Verifica los permisos de almacenamiento en tu dispositivo
- Prueba usando un navegador diferente
- En móvil, verifica que tengas espacio disponible

### "No encuentro el archivo en mi móvil"
- Busca en la carpeta `Descargas` o `Downloads`
- Usa un gestor de archivos como Google Files
- El archivo tiene extensión `.json`

## 📱 Formato del archivo

El archivo de exportación es un JSON con esta estructura:

```json
{
  "version": "1.0",
  "exportDate": "2024-01-15T10:30:00.000Z",
  "data": {
    "commutes": [...],
    "routes": [...],
    "commuteTypes": [...],
    "predictionSettings": {...}
  }
}
```

Este archivo es legible por humanos, así que puedes abrirlo con cualquier editor de texto para verificar su contenido.

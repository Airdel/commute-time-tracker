# Configuración de Usuario

Esta aplicación está configurada para uso personal con tu cuenta hardcodeada.

## Cómo configurar tu información de usuario

1. Abre el archivo `src/lib/user-config.ts`
2. Reemplaza los valores con tu información:

```typescript
export const HARDCODED_USER = {
  login: 'tu-usuario-github',           // Tu nombre de usuario de GitHub
  email: 'tu-email@ejemplo.com',        // Tu correo electrónico
  avatarUrl: 'https://github.com/tu-usuario-github.png',  // Tu avatar (GitHub lo genera automáticamente)
  id: 1,
  isOwner: true,
};
```

### Ejemplo:

Si tu usuario de GitHub es `jasminez-dev`, deberías configurarlo así:

```typescript
export const HARDCODED_USER = {
  login: 'jasminez-dev',
  email: 'contacto@jasminez.com',
  avatarUrl: 'https://github.com/jasminez-dev.png',
  id: 1,
  isOwner: true,
};
```

## Funcionalidades

✅ **Sincronización automática**: Todos tus datos se sincronizan automáticamente usando el sistema `useKV` de Spark
✅ **Acceso privado**: Solo tu cuenta puede acceder y modificar los datos
✅ **Multi-dispositivo**: Accede desde cualquier dispositivo con tus datos sincronizados
✅ **Offline-first**: La app funciona sin conexión y sincroniza cuando vuelve la conexión

## ¿Qué cambió?

- ✅ Se removió la autenticación dinámica que no funcionaba
- ✅ Se hardcodeó tu cuenta de usuario
- ✅ Los datos siguen sincronizándose correctamente con `useKV`
- ✅ El indicador de sincronización muestra el estado real de la conexión
- ✅ Todo funciona exactamente igual, pero sin pedir login/logout

## Notas importantes

- La sincronización usa el sistema KV de Spark, que está vinculado a tu sesión de GitHub Spark
- Los datos se guardan de forma segura en la nube y solo tú puedes acceder a ellos
- No necesitas hacer login manualmente, la app ya sabe que eres tú

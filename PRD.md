# Planning Guide

Una aplicación de registro de traslados que ayuda a usuarios en Tepic, Nayarit a monitorear sus tiempos de viaje en diversas rutas de camión, identificando patrones y mejorando la gestión del tiempo con predicciones inteligentes de horarios de salida.

**Experience Qualities**: 
1. **Eficiente** - Registrar un traslado debe tomar segundos, con mínima fricción entre llegar y guardar el registro
2. **Revelador** - Las visualizaciones de datos y predicciones revelan patrones en los tiempos de traslado, ayudando a los usuarios a tomar mejores decisiones de transporte
3. **Flexible** - Soporta múltiples rutas y tipos de traslados personalizables, adaptándose a las necesidades específicas de cada usuario

**Complexity Level**: Light Application (multiple features with basic state)
Esta es una utilidad enfocada con características distintas (registro, historial, análisis, configuración) que requiere gestión de estado persistente pero evita integraciones complejas o sistemas de cuentas.

## Deployment Strategy

### Mobile Deployment (Android)
- **Platform**: Capacitor para convertir la web app en aplicación Android nativa
- **Distribution**: APK directo para instalación en dispositivos personales
- **Build Process**: 
  - Desarrollo local con Android Studio
  - Opcionalmente GitHub Actions para CI/CD automático
- **Requirements**:
  - Android 7.0+ (API 24+) compatible
  - ~10MB tamaño de app estimado
  - Permisos: ninguno especial requerido (solo almacenamiento local)
- **Key Files**:
  - `capacitor.config.ts` - Configuración de Capacitor
  - `DEPLOYMENT.md` - Guía completa de despliegue
  - `QUICK_COMMANDS.md` - Comandos rápidos de desarrollo
  - `GITHUB_ACTIONS.md` - Automatización opcional con CI/CD

## Essential Features

### Registro Rápido de Traslado
- **Functionality**: Registro con un toque del traslado con tipo personalizable (trabajo, escuela, gimnasio, etc.), ruta seleccionable, hora de salida, hora de llegada, y notas opcionales
- **Purpose**: Minimizar la fricción en el registro diario para fomentar hábitos consistentes de seguimiento
- **Trigger**: Usuario presiona el botón "Iniciar traslado" en pantalla principal
- **Progression**: Seleccionar tipo de traslado → Seleccionar ruta → Captura automática de hora actual o ajuste manual → Agregar hora de llegada → Notas opcionales (número de camión, retrasos, etc.) → Guardar
- **Success criteria**: Traslado registrado y almacenado en menos de 15 segundos; datos persisten entre sesiones

### Gestión de Rutas
- **Functionality**: Crear, editar y eliminar rutas de camión personalizadas con nombres y colores identificables
- **Purpose**: Permitir a usuarios registrar diferentes rutas que toman regularmente y analizar sus patrones por ruta
- **Trigger**: Usuario navega a pestaña "Ajustes" y gestiona rutas
- **Progression**: Ver lista de rutas → Agregar nueva ruta con nombre y color → Editar rutas existentes → Eliminar rutas no utilizadas
- **Success criteria**: Rutas persisten entre sesiones; se muestran en selectores al registrar traslados

### Tipos de Traslado Personalizables
- **Functionality**: Crear tipos de traslado personalizados más allá de "hacia/desde el trabajo" (ej: al gimnasio, a la escuela, al doctor)
- **Purpose**: Adaptar la app a diferentes necesidades de transporte del usuario
- **Trigger**: Usuario navega a pestaña "Ajustes" y gestiona tipos
- **Progression**: Ver tipos predeterminados → Agregar nuevos tipos con nombre y descripción → Editar o eliminar tipos personalizados
- **Success criteria**: Tipos personalizados aparecen en todas las interfaces de la app

### Sistema de Predicción de Salidas
- **Functionality**: Analiza histórico de traslados para sugerir hora óptima de salida basada en hora de llegada deseada
- **Purpose**: Ayudar a usuarios a planificar salidas para llegar a tiempo considerando variabilidad del tráfico
- **Trigger**: Se muestra automáticamente en pestaña "Registro" para traslados hacia el trabajo
- **Progression**: Usuario configura hora de entrada al trabajo y margen deseado → Sistema analiza últimos N días → Calcula percentil 75 de duración → Sugiere hora de salida conservadora y recomendada
- **Success criteria**: Predicción se actualiza automáticamente con cada nuevo traslado; sugerencias son precisas y útiles

### Vista de Historial
- **Functionality**: Lista cronológica de todos los traslados registrados con detalles clave (fecha, tipo, ruta, duración, notas)
- **Purpose**: Proveer referencia rápida a traslados pasados y permitir a usuarios identificar anomalías
- **Trigger**: Usuario navega a pestaña "Historial"
- **Progression**: Ver lista ordenada por fecha (más reciente primero) → Tocar entrada para ver detalles completos → Opción de editar o eliminar
- **Success criteria**: Todos los traslados se muestran correctamente; operaciones de edición/eliminación funcionan confiablemente

### Panel de Estadísticas
- **Functionality**: Estadísticas visuales mostrando tiempos promedio de traslado, viajes más rápidos/lentos, tendencias en el tiempo, con filtros por tipo y ruta
- **Purpose**: Ayudar a usuarios a entender sus patrones de traslado y planificar en consecuencia
- **Trigger**: Usuario navega a pestaña "Estadísticas"
- **Progression**: Ver tarjetas resumen → Filtrar por tipo de traslado o ruta → Ver gráfica de tiempos recientes → Comparar estadísticas entre tipos y rutas
- **Success criteria**: Las estadísticas calculan correctamente; visualizaciones son claras y significativas; filtros funcionan correctamente

### Modo de Cronómetro Rápido
- **Functionality**: Cronómetro en tiempo real que inicia al abordar el camión y se detiene al llegar
- **Purpose**: Eliminar entrada manual de tiempo para usuarios activamente en traslado
- **Trigger**: Usuario presiona botón "Iniciar viaje" y selecciona tipo y ruta
- **Progression**: Seleccionar tipo y ruta → Cronómetro inicia → Usuario aborda camión → Cronómetro corre → Presionar "Terminar viaje" al llegar → Revisar y guardar con notas opcionales
- **Success criteria**: Cronómetro corre con precisión; traslado se registra automáticamente con duración correcta

### Modo Oscuro Funcional
- **Functionality**: Toggle para cambiar entre modo claro y oscuro con persistencia de preferencia
- **Purpose**: Mejorar usabilidad en diferentes condiciones de iluminación y preferencias del usuario
- **Trigger**: Usuario presiona el botón de modo en el encabezado
- **Progression**: Clic en botón → Tema cambia instantáneamente → Preferencia se guarda y persiste entre sesiones
- **Success criteria**: Tema persiste entre sesiones y recargas; transición es suave; todos los componentes se adaptan correctamente

## Edge Case Handling

- **Sin traslados registrados aún** - Mostrar estado vacío con mensaje alentador y prominente llamado a la acción "Registrar primer traslado"
- **Cronómetro accidentalmente cerrado** - Persistir estado del cronómetro para que continúe si usuario navega fuera o refresca
- **Entradas de tiempo inválidas** - Validar que hora de llegada sea después de hora de salida; mostrar mensaje de error útil
- **Datos faltantes en análisis** - Mostrar mensaje "Datos insuficientes" cuando se hayan registrado menos de 3 traslados
- **Tiempos de traslado muy largos** - Manejar casos donde usuario olvida detener cronómetro (solicitar confirmación para viajes >3 horas)
- **Eliminación de rutas/tipos en uso** - Prevenir eliminación de rutas predeterminadas y tipos base; permitir edición en su lugar
- **Predicción sin datos suficientes** - Mostrar mensaje indicando que se necesitan al menos 3 traslados del tipo para generar predicción

## Design Direction

El diseño debe sentirse eficiente y con temática de transporte, evocando la confiabilidad de un sistema de transporte público bien administrado con elementos de interfaz limpios y minimalistas que priorizan velocidad de uso. Una interfaz rica con visualizaciones de datos y predicciones inteligentes sirve el propósito analítico mientras mantiene claridad.

## Color Selection

Esquema de colores triádico inspirado en sistemas de tránsito urbano - usando azul (confianza, eficiencia), ámbar (precaución/tiempo), y verde (éxito/completado) para crear una paleta balanceada y energética que se siente profesional y accesible.

- **Primary Color**: Azul Tránsito Profundo (oklch(0.45 0.15 250)) - Comunica confiabilidad y eficiencia, representa el sistema de camiones
- **Secondary Colors**: 
  - Gris Suave (oklch(0.96 0.005 250)) para fondos sutiles
  - Carbón (oklch(0.35 0.01 250)) para texto secundario y elementos UI menos prominentes
- **Accent Color**: Ámbar Alerta (oklch(0.75 0.15 75)) - Resalta cronómetros activos y predicciones importantes
- **Foreground/Background Pairings**:
  - Background Light (Blanco oklch(1 0 0)): Texto azul profundo (oklch(0.25 0.1 250)) - Ratio 9.2:1 ✓
  - Background Dark (oklch(0.15 0.02 250)): Texto claro (oklch(0.95 0.01 250)) - Ratio 12.5:1 ✓
  - Card Light (Gris suave oklch(0.96 0.005 250)): Texto azul profundo (oklch(0.25 0.1 250)) - Ratio 8.5:1 ✓
  - Card Dark (oklch(0.20 0.02 250)): Texto claro (oklch(0.95 0.01 250)) - Ratio 11.2:1 ✓
  - Primary (Azul tránsito oklch(0.45 0.15 250)): Texto blanco (oklch(1 0 0)) - Ratio 6.8:1 ✓
  - Accent Light (Ámbar oklch(0.75 0.15 75)): Texto azul profundo (oklch(0.25 0.1 250)) - Ratio 6.2:1 ✓
  - Accent Dark (Ámbar oklch(0.70 0.15 75)): Texto oscuro (oklch(0.15 0.02 250)) - Ratio 5.8:1 ✓

## Font Selection

La tipografía debe transmitir claridad y precisión, reflejando la naturaleza sensible al tiempo del seguimiento de traslados con una sans-serif moderna que se siente técnica y amigable. Inter provee excelente legibilidad en todos los tamaños e incluye números tabulares perfectos para mostrar tiempos y estadísticas.

- **Typographic Hierarchy**:
  - H1 (Títulos de página): Inter Bold/32px/espaciado apretado (-0.02em)
  - H2 (Encabezados de sección): Inter SemiBold/24px/espaciado normal
  - H3 (Títulos de tarjeta): Inter Medium/18px/espaciado normal
  - Body (Texto general): Inter Regular/16px/altura de línea relajada (1.6)
  - Small (Metadatos): Inter Regular/14px/espaciado normal, color apagado
  - Time Display (Cronómetro/Duración): Inter SemiBold/40px/tabular-nums, espaciado apretado

## Animations

Las animaciones deben sentirse ágiles y con propósito, reflejando el ritmo rápido de tomar un camión mientras proveen retroalimentación satisfactoria para acciones completadas. Movimiento sutil guía la atención sin retrasar la completación de tareas.

- **Purposeful Meaning**: Pulsación del cronómetro comunica seguimiento activo; transiciones de tema son suaves; cards de predicción llaman la atención sutilmente
- **Hierarchy of Movement**: 
  - Crítico: Inicio/detención del cronómetro obtiene retroalimentación animada inmediata y prominente
  - Importante: Nuevas tarjetas de traslado se deslizan en la lista de historial; cambio de tema
  - Sutil: Animaciones de contadores de estadísticas cuando se carga el panel, estados hover en elementos interactivos

## Component Selection

- **Components**: 
  - Card para entradas de traslado y resúmenes de estadísticas con profundidad de sombra para jerarquía
  - Tabs para navegación entre secciones Registro/Historial/Estadísticas/Ajustes
  - Dialog para formularios de entrada de traslado, configuración de rutas y tipos
  - Select para selección de rutas y tipos de traslado
  - Variantes de Button (primary para "Iniciar viaje", secondary para "Cancelar", ghost para acciones de lista)
  - Badge para etiquetas de tipo, ruta y duración con codificación de color
  - Separator para separaciones visuales de sección
  - ScrollArea para lista de historial
  - Theme Toggle para cambiar entre modo claro y oscuro
  
- **Customizations**: 
  - Componente de visualización de cronómetro circular grande con anillo de progreso animado
  - Componente PredictionCard mostrando sugerencias de horario de salida con gradiente de fondo
  - Componente badge de duración mostrando tiempo formateado (ej., "28 min")
  - Componente de gráfica de barras simple usando alturas de div para visualización de tiempos de traslado
  - Badges de ruta con colores personalizados
  - Ilustraciones de estado vacío para cada pestaña
  
- **States**: 
  - Buttons: Default tiene sombra sutil, hover levanta ligeramente, active escala hacia abajo, disabled reduce opacidad y elimina pointer
  - Botón de cronómetro: Borde pulsante cuando activo, cambio de color de verde (iniciar) a rojo (detener)
  - Form inputs: Anillo de enfoque sutil en color primario, estado de error con borde rojo e icono
  - Cards: Hover revela botones de acción (editar/eliminar), estado seleccionado para ver detalles
  - Theme toggle: Muestra icono correspondiente (sol/luna) según tema activo
  
- **Icon Selection**: 
  - Bus (para logo principal y estados vacíos)
  - MapPin (para rutas)
  - Tag (para tipos de traslado)
  - Play/Stop (para controles de cronómetro)
  - Clock (para visualizaciones de tiempo)
  - Lightbulb (para predicciones)
  - ChartBar (para pestaña de análisis)
  - Plus (para agregar nuevo traslado/ruta/tipo)
  - Pencil/Trash (para acciones de editar/eliminar)
  - Moon/Sun (para toggle de tema)
  - TrendUp/TrendDown (para indicadores de estadísticas)
  
- **Spacing**: 
  - Container padding: p-6 en desktop, p-4 en mobile
  - Card internal spacing: p-6
  - Gap entre cards: gap-4
  - Gap dentro de contenido de card: gap-3
  - Button padding: px-6 py-3 para primary, px-4 py-2 para secondary
  
- **Mobile**: 
  - Timer display escala proporcionalmente mientras mantiene legibilidad
  - Cards se apilan verticalmente con ancho completo
  - Reduce padding a p-4 globalmente, cards a p-4
  - Tabs con grid responsivo (4 columnas en desktop, scroll horizontal en mobile)
  - Visualizaciones de estadísticas se muestran como tarjetas apiladas en lugar de grid
  - Selectores y formularios se adaptan al ancho disponible

## Essential Features

### Registro Rápido de Traslado
- **Functionality**: Registro con un toque del traslado con dirección (hacia/desde el trabajo), hora de salida, hora de llegada, y notas opcionales
- **Purpose**: Minimizar la fricción en el registro diario para fomentar hábitos consistentes de seguimiento
- **Trigger**: Usuario presiona el botón "Iniciar traslado" en pantalla principal
- **Progression**: Seleccionar dirección → Captura automática de hora actual o ajuste manual → Agregar hora de llegada → Notas opcionales (número de camión, retrasos, etc.) → Guardar
- **Success criteria**: Traslado registrado y almacenado en menos de 15 segundos; datos persisten entre sesiones

### Vista de Historial
- **Functionality**: Lista cronológica de todos los traslados registrados con detalles clave (fecha, dirección, duración, notas)
- **Purpose**: Proveer referencia rápida a traslados pasados y permitir a usuarios identificar anomalías
- **Trigger**: Usuario navega a pestaña "Historial"
- **Progression**: Ver lista ordenada por fecha (más reciente primero) → Tocar entrada para ver detalles completos → Opción de editar o eliminar
- **Success criteria**: Todos los traslados se muestran correctamente; operaciones de edición/eliminación funcionan confiablemente

### Panel de Estadísticas
- **Functionality**: Estadísticas visuales mostrando tiempos promedio de traslado, viajes más rápidos/lentos, tendencias en el tiempo
- **Purpose**: Ayudar a usuarios a entender sus patrones de traslado y planificar en consecuencia
- **Trigger**: Usuario navega a pestaña "Estadísticas"
- **Progression**: Ver tarjetas resumen (promedio hacia trabajo, promedio desde trabajo, viajes totales) → Ver gráfica de tiempos de traslado de últimos 30 días → Identificar patrones
- **Success criteria**: Las estadísticas calculan correctamente; visualizaciones son claras y significativas

### Modo de Cronómetro Rápido
- **Functionality**: Cronómetro en tiempo real que inicia al abordar el camión Jasminez y se detiene al llegar
- **Purpose**: Eliminar entrada manual de tiempo para usuarios activamente en traslado
- **Trigger**: Usuario presiona botón "Iniciar viaje" y selecciona dirección
- **Progression**: Seleccionar dirección → Cronómetro inicia → Usuario aborda camión → Cronómetro corre → Presionar "Terminar viaje" al llegar → Revisar y guardar con notas opcionales
- **Success criteria**: Cronómetro corre con precisión; traslado se registra automáticamente con duración correcta

### Selector de Modo Oscuro
- **Functionality**: Toggle para cambiar entre modo claro y oscuro
- **Purpose**: Mejorar usabilidad en diferentes condiciones de iluminación y preferencias del usuario
- **Trigger**: Usuario presiona el botón de modo en el encabezado
- **Progression**: Clic en botón → Tema cambia instantáneamente → Preferencia se guarda
- **Success criteria**: Tema persiste entre sesiones; transición es suave

## Edge Case Handling

- **Sin traslados registrados aún** - Mostrar estado vacío con mensaje alentador y prominente llamado a la acción "Registrar primer traslado"
- **Cronómetro accidentalmente cerrado** - Persistir estado del cronómetro para que continúe si usuario navega fuera o refresca
- **Entradas de tiempo inválidas** - Validar que hora de llegada sea después de hora de salida; mostrar mensaje de error útil
- **Datos faltantes en análisis** - Mostrar mensaje "Datos insuficientes" cuando se hayan registrado menos de 3 traslados
- **Tiempos de traslado muy largos** - Manejar casos donde usuario olvida detener cronómetro (solicitar confirmación para viajes >3 horas)

## Design Direction

El diseño debe sentirse eficiente y con temática de transporte, evocando la confiabilidad de un sistema de transporte público bien administrado con elementos de interfaz limpios y minimalistas que priorizan velocidad de uso. Una interfaz rica con visualizaciones de datos sirve el propósito analítico mientras mantiene claridad.

## Color Selection

Esquema de colores triádico inspirado en sistemas de tránsito urbano - usando azul (confianza, eficiencia), ámbar (precaución/tiempo), y verde (éxito/completado) para crear una paleta balanceada y energética que se siente profesional y accesible.

- **Primary Color**: Azul Tránsito Profundo (oklch(0.45 0.15 250)) - Comunica confiabilidad y eficiencia, representa el sistema de camiones
- **Secondary Colors**: 
  - Gris Suave (oklch(0.96 0.005 250)) para fondos sutiles
  - Carbón (oklch(0.35 0.01 250)) para texto secundario y elementos UI menos prominentes
- **Accent Color**: Ámbar Alerta (oklch(0.75 0.15 75)) - Resalta cronómetros activos y acciones importantes sensibles al tiempo como "Iniciar viaje"
- **Foreground/Background Pairings**:
  - Background (Blanco oklch(1 0 0)): Texto azul profundo (oklch(0.25 0.1 250)) - Ratio 9.2:1 ✓
  - Card (Gris suave oklch(0.96 0.005 250)): Texto azul profundo (oklch(0.25 0.1 250)) - Ratio 8.5:1 ✓
  - Primary (Azul tránsito profundo oklch(0.45 0.15 250)): Texto blanco (oklch(1 0 0)) - Ratio 6.8:1 ✓
  - Secondary (Azul claro oklch(0.92 0.03 250)): Texto azul profundo (oklch(0.25 0.1 250)) - Ratio 8.1:1 ✓
  - Accent (Ámbar alerta oklch(0.75 0.15 75)): Texto azul profundo (oklch(0.25 0.1 250)) - Ratio 6.2:1 ✓
  - Muted (Plata oklch(0.88 0.01 250)): Texto carbón (oklch(0.45 0.01 250)) - Ratio 5.2:1 ✓

## Font Selection

La tipografía debe transmitir claridad y precisión, reflejando la naturaleza sensible al tiempo del seguimiento de traslados con una sans-serif moderna que se siente técnica y amigable. Inter provee excelente legibilidad en todos los tamaños e incluye números tabulares perfectos para mostrar tiempos y estadísticas.

- **Typographic Hierarchy**:
  - H1 (Títulos de página): Inter Bold/32px/espaciado apretado (-0.02em)
  - H2 (Encabezados de sección): Inter SemiBold/24px/espaciado normal
  - H3 (Títulos de tarjeta): Inter Medium/18px/espaciado normal
  - Body (Texto general): Inter Regular/16px/altura de línea relajada (1.6)
  - Small (Metadatos): Inter Regular/14px/espaciado normal, color apagado
  - Time Display (Cronómetro/Duración): Inter SemiBold/40px/tabular-nums, espaciado apretado

## Animations

Las animaciones deben sentirse ágiles y con propósito, reflejando el ritmo rápido de tomar un camión mientras proveen retroalimentación satisfactoria para acciones completadas. Movimiento sutil guía la atención sin retrasar la completación de tareas.

- **Purposeful Meaning**: Pulsación del cronómetro comunica seguimiento activo; marcas de verificación de éxito celebran traslados registrados; barras de gráficas animan al cargar para revelar datos progresivamente
- **Hierarchy of Movement**: 
  - Crítico: Inicio/detención del cronómetro obtiene retroalimentación animada inmediata y prominente
  - Importante: Nuevas tarjetas de traslado se deslizan en la lista de historial
  - Sutil: Animaciones de contadores de estadísticas cuando se carga el panel, estados hover en elementos interactivos

## Component Selection

- **Components**: 
  - Card para entradas de traslado y resúmenes de estadísticas con profundidad de sombra para jerarquía
  - Tabs para navegación entre secciones Registro/Historial/Estadísticas
  - Dialog para formulario de entrada de traslado con validación
  - Variantes de Button (primary para "Iniciar viaje", secondary para "Cancelar", ghost para acciones de lista)
  - Badge para etiquetas de dirección (Hacia/Desde el trabajo) con codificación de color
  - Separator para separaciones visuales de sección
  - ScrollArea para lista de historial
  - Theme Toggle para cambiar entre modo claro y oscuro
  
- **Customizations**: 
  - Componente de visualización de cronómetro circular grande con anillo de progreso animado
  - Componente badge de duración mostrando tiempo formateado (ej., "28 min")
  - Componente de gráfica de barras simple usando alturas de div para visualización de tiempos de traslado
  - Ilustraciones de estado vacío para cada pestaña
  
- **States**: 
  - Buttons: Default tiene sombra sutil, hover levanta ligeramente, active escala hacia abajo, disabled reduce opacidad y elimina pointer
  - Botón de cronómetro: Borde pulsante cuando activo, cambio de color de verde (iniciar) a rojo (detener)
  - Form inputs: Anillo de enfoque sutil en color primario, estado de error con borde rojo e icono
  - Cards: Hover revela botones de acción (editar/eliminar), estado seleccionado para ver detalles
  
- **Icon Selection**: 
  - Bus (para logo principal y estados vacíos)
  - ArrowRight/ArrowLeft (para indicadores de dirección)
  - Play/Stop (para controles de cronómetro)
  - Clock (para visualizaciones de tiempo)
  - ChartBar (para pestaña de análisis)
  - Plus (para agregar nuevo traslado)
  - Pencil/Trash (para acciones de editar/eliminar)
  - Moon/Sun (para toggle de tema)
  
- **Spacing**: 
  - Container padding: p-6 en desktop, p-4 en mobile
  - Card internal spacing: p-6
  - Gap entre cards: gap-4
  - Gap dentro de contenido de card: gap-3
  - Button padding: px-6 py-3 para primary, px-4 py-2 para secondary
  
- **Mobile**: 
  - Timer display escala proporcionalmente mientras mantiene legibilidad
  - Cards se apilan verticalmente con ancho completo
  - Reduce padding a p-4 globalmente, cards a p-4
  - Visualizaciones de estadísticas se muestran como tarjetas horizontales deslizables en lugar de grid

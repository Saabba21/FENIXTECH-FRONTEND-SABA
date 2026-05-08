# 🐦‍🔥 FenixTech - Panel de Administración (Angular)

Este repositorio contiene el código fuente para el panel de administración de **FenixTech**. Se trata de una ampliación individual del proyecto original, desarrollada de forma independiente con **Angular**.

Este panel de control permitirá a los administradores gestionar usuarios, productos y otras entidades de la plataforma, y contará con su propio sistema de autenticación.

---

##  Índice

- [Guía de Inicio Rápido](#-guía-de-inicio-rápido-angular)
- [Sistema de Diseño y Estilos (SCSS)](#-sistema-de-diseño-y-arquitectura-de-estilos-scss)
- [Estándares de Trabajo](#️-estándares-de-trabajo)
- [Conexión con el Backend](#-conexión-con-el-backend)
- [Accesibilidad](#-accesibilidad)

---

## 🚀 Guía de Inicio Rápido (Angular)

Sigue estos pasos para configurar y ejecutar el entorno de desarrollo local.

### 1. Prerrequisitos
Asegúrate de tener instalado **Node.js** (versión LTS recomendada) y el **Angular CLI** de forma global.

```bash
# Instalar Angular CLI si no lo tienes
npm install -g @angular/cli
```

### 2. Instalación de Dependencias
Clona el repositorio, navega a la carpeta raíz del proyecto y ejecuta:

```bash
npm install
```
Este comando instalará todas las dependencias necesarias, incluyendo Angular y Bootstrap.

### 3. Servidor de Desarrollo
Para levantar la aplicación en un servidor local (normalmente en `http://localhost:4200/`), ejecuta:

```bash
ng serve -o
```
La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

---

## 🎨 Sistema de Diseño (Bootstrap 5) y Estilos (SCSS)

Para mantener la consistencia visual con el proyecto principal de FenixTech, este panel de administración reutiliza el mismo sistema de diseño basado en **Bootstrap 5** y **SASS (SCSS)**.

### Convenciones de UI y Layout

El proyecto original minimiza al máximo el uso de CSS global y construye la interfaz componiendo rigurosamente **clases de utilidad de Bootstrap 5**. Al crear los nuevos componentes en Angular, se debe aplicar el siguiente sistema:

#### 1. Sistema de Rejilla (Grid) y Contenedores
- **Contenedores Principales**: Se usa la clase `container` estándar para mantener los márgenes, pero se aplica `container-fluid p-0` para vistas que requieren el 100% del ancho (como el dashboard de perfiles).
- **Gestión de Filas y Huecos (Gap)**: Uso constante de la clase `row` acompañada de modificadores `gap`. Estos varían según la densidad de la pantalla:
  - `g-3`: Para agrupar inputs dentro de formularios.
  - `g-4`: Para tarjetas y dashboard (ej. perfil de usuario).
  - `g-5`: Para separaciones amplias (ej. detalles de producto).
- **Columnas Responsivas (Mobile-First)**:
  - Los componentes siempre ocupan todo el ancho en móviles usando `col-12`.
  - Se fraccionan en tablets (`col-md-6` en formularios).
  - Y en escritorio usan `col-lg-4`, `col-lg-6` o `col-lg-8`.
- **Alineación Flexbox**: Amplio uso para centrar layouts a pantalla completa combinando `d-flex flex-column align-items-center justify-content-center`.

#### 2. Estandarización de Formularios
Los formularios en este proyecto tienen un diseño visual muy característico que Angular deberá replicar (por ejemplo, con `ReactiveFormsModule`):
- **Estructura Visual**: Los `<form>` se envuelven en diseños tipo "tarjeta" combinando las clases `p-4 border rounded shadow-sm bg-light`.
- **Inputs y Selects**: Siempre deben llevar un resalte oscuro con el fondo blanco explícito, usando las clases combinadas: `form-control border-black bg-white` o `form-select border-black bg-white`.
- **Labels**: Todas las etiquetas llevan grosor medio de fuente con `form-label fw-medium`.
- **Validación Visual**: Se delega en Bootstrap. El formulario arranca con la clase `needs-validation` y pasa a `was-validated` al intentar enviar. Los mensajes de error se colocan en un div con clase `.invalid-feedback`.

#### 3. Interfaz de Botones, Iconos y Tipografía
- **Botones de Acción**: Los botones principales son largos y contundentes: `btn btn-primary p-3 fw-medium w-100`.
- **Iconografía**: Se utiliza nativamente **Bootstrap Icons**. Todos los iconos se renderizan con las clases de su librería (ej. `bi bi-exclamation-triangle-fill`).
- **Tipografías**: Los pesos tipográficos se gestionan directamente en el HTML con `fw-bold` (títulos) o `fw-medium` (etiquetas).

#### 4. Estados Dinámicos: Carga y Errores
Toda comunicación con el backend (API) debe reflejar los siguientes patrones de estado en pantalla:
- **Pantallas de Carga (Loaders)**: Contenedor flex para centrar con un alto mínimo forzado en línea (ej. `style="min-height: 50vh;"`) y el uso de `spinner-border text-primary`.
- **Mensajes de Error**: Utilización genérica de componentes de alerta con estilo rojo `alert alert-danger` y márgenes espaciadores (ej. `m-4`).

#### 5. Estilos en Línea y SCSS Personalizado
La escritura de CSS se limita drásticamente para prevenir código espagueti. Las excepciones permitidas son:
- **Alturas o anchuras específicas de bloque**: Es común ver el atributo `style` para fijar tamaños muy concretos en componentes layout (ej. `style={{minHeight: "75vh"}}` o `style={{maxWidth: "800px"}}`). ¡Ojo! Angular maneja esto con `[ngStyle]`.
- **Clases Extendidas (Tailwind-like)**: Hay evidencia en el proyecto de clases utilitarias personalizadas (como `.text-gray-500` o `.border-black` forzado en selects). Estas clases no son nativas del core general de Bootstrap y **deben definirse en el sistema global `_variables.scss`** o extenderse mediante la API Utility de Bootstrap en tu archivo `styles.scss` de Angular.

### Estructura de Estilos en Angular

La arquitectura de estilos se adapta al ecosistema de Angular para promover la modularidad y el encapsulamiento.

- **`src/styles.scss`**: Este es el archivo principal de estilos globales. Aquí se importan las variables, Bootstrap y otros estilos generales.
- **`src/assets/scss/_variables.scss`**: Archivo para **sobrescribir las variables de Bootstrap**. Aquí definirás la paleta de colores corporativos, tipografías y otros valores por defecto antes de importar Bootstrap.
- **Estilos de Componentes**: Cada componente de Angular (`.ts`) tiene su propio archivo de estilos (`.scss`) donde se definen las reglas específicas para ese componente. Gracias al encapsulamiento de Angular, estos estilos no afectarán a otros componentes.

### Orden de Importación en `src/styles.scss`

El orden de importación en el archivo global `src/styles.scss` es crucial para que nuestras personalizaciones funcionen correctamente.

```scss
// 1. Define tus variables personalizadas para sobrescribir las de Bootstrap.
// La ruta debe ser relativa desde `src/styles.scss`.
@import "assets/scss/variables";

// 2. Importa Bootstrap. Usará las variables que definiste en el paso anterior.
@import "bootstrap/scss/bootstrap";

// 3. (Opcional) Importa otros parciales con estilos globales o overrides.
// @import "assets/scss/global";
// @import "assets/scss/overrides";
```

Para que esta configuración funcione, asegúrate de que la ruta de `bootstrap` esté correctamente configurada en tu `angular.json` dentro de `build.options.stylePreprocessorOptions.includePaths`.

```json
"stylePreprocessorOptions": {
  "includePaths": [
    "node_modules"
  ]
}
```

---

## ⚙️ Estándares de Trabajo

Para mantener un código limpio, un historial legible y un flujo de trabajo ordenado, se adoptan los siguientes estándares del proyecto original.

### Gestión de Ramas (Git Flow)

El trabajo se organiza mediante **ramas de funcionalidad** (feature branches).

- **Rama `main`**: Es la rama principal y siempre debe contener código estable y funcional. **No se deben hacer commits directos a `main`**. Todos los cambios deben integrarse a través de Pull Requests.
- **Nomenclatura de Ramas**: Cada nueva tarea debe desarrollarse en su propia rama, utilizando el siguiente prefijo:

| Prefijo | Uso | Ejemplo |
| :--- | :--- | :--- |
| `feat/` | Nueva funcionalidad | `feat/login-admin` |
| `fix/` | Corrección de errores | `fix/auth-guard-bug` |
| `style/` | Cambios de diseño/estilo | `style/dashboard-layout` |
| `refactor/`| Refactorización de código | `refactor/api-service` |
| `docs/` | Cambios en la documentación | `docs/actualizar-readme` |
| `chore/` | Mantenimiento o configuración | `chore/update-angular-version` |

### Estándar de Mensajes de Commit (Conventional Commits)

Cada commit debe seguir una estructura clara para automatizar el versionado y facilitar la lectura del historial.

**Formato**: `tipo(contexto): descripción breve`

- **Tipos de Commit**:
  - `feat`: Una nueva funcionalidad.
  - `fix`: Corrección de un bug.
  - `style`: Cambios de CSS/SCSS que no afectan a la lógica.
  - `refactor`: Cambios en el código que no son ni `fix` ni `feat`.
  - `docs`: Cambios exclusivos de la documentación.
  - `chore`: Tareas de mantenimiento (actualizar dependencias, configurar herramientas).

- **Contexto (Scope)**: Es opcional pero muy recomendado. En Angular, puede ser un módulo, componente o servicio.
  - `feat(auth): implementar JWT interceptor`
  - `fix(dashboard): corregir cálculo de estadísticas`
  - `style(login-form): ajustar espaciado de botones`

---

## 🔌 Conexión con el Backend

El panel de administración se comunicará con la misma API REST que el frontend principal.

- **URL Base de la API**: `http://localhost/fenixtech/api/v1/`
- **Autenticación**: Este panel tendrá un flujo de login independiente para administradores. Se deberá implementar un servicio de autenticación (`AuthService`) que gestione el token (ej. JWT) y un `HttpInterceptor` para añadirlo a las cabeceras de las peticiones salientes.
- **Ejemplo de Endpoint**: `GET /users/{userId}`

---

## ♿ Accesibilidad

Siguiendo las buenas prácticas del proyecto original (que incluía herramientas como `axe-core`), se debe prestar especial atención a la accesibilidad web (WCAG).

- Utiliza HTML semántico.
- Asegura un contraste de color adecuado.
- Proporciona texto alternativo para las imágenes.
- Asegúrate de que toda la funcionalidad sea accesible por teclado.

Se recomienda utilizar herramientas como **axe DevTools** durante el desarrollo para identificar y corregir problemas de accesibilidad.
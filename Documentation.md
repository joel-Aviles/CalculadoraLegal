### Documentación Técnica del Proyecto

#### 2. **Estructura del Proyecto**
La estructura del proyecto está organizada de la siguiente manera:

```
src/
├── App.jsx              # Componente principal de la aplicación
├── Constants.js         # Constantes globales del proyecto
├── index.css            # Estilos globales
├── main.jsx             # Punto de entrada principal
├── assets/              # Recursos estáticos
│   └── react.svg        # Logo de React
├── components/          # Componentes reutilizables
│   ├── DowloadFile.jsx
│   ├── FileInput.jsx
│   ├── Input.jsx
│   ├── RadioButtons.jsx
│   ├── Select.jsx
│   └── index.js         # Archivo de exportación de componentes
├── Hooks/               # Hooks personalizados
│   └── useForm.js
├── utils/               # Utilidades y funciones auxiliares
    ├── apiService.js    # Servicios de API
    └── formUtils.js     # Funciones relacionadas con formularios
```

---

#### 3. **Descripción de Archivos Clave**

##### **Componente Principal**
- **`App.jsx`**: Es el componente raiz que orquesta la renderización de otros componentes y maneja la lógica principal de la aplicación.

##### **Componentes Reutilizables**
- **`DowloadFile.jsx`**: Componente para descargar archivos.
- **`FileInput.jsx`**: Componente para manejar la carga de archivos desde el sistema del usuario.
- **`Input.jsx`**: Campo de entrada reutilizable con personalización.
- **`RadioButtons.jsx`**: Componente que implementa un grupo de botones de radio.
- **`Select.jsx`**: Componente de selección desplegable (dropdown).

##### **Hooks Personalizados**
- **`useForm.js`**: Hook que gestiona el estado y las validaciones de formularios.

##### **Utilidades**
- **`apiService.js`**: Maneja las interacciones con APIs externas.
- **`formUtils.js`**: Incluye funciones auxiliares relacionadas con formularios (por ejemplo, validaciones y normalizaciones).

---

#### 4. **Dependencias del Proyecto**
Este proyecto depende de las siguientes bibliotecas:
- **React**: Biblioteca principal para construir interfaces de usuario.
- **ReactDOM**: Para el renderizado en el DOM.
- **Tailwind css**: Para estilos.

---

#### 5. **Guía de Instalación**
1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/joel-Aviles/CalculadoraLegal.
   ```
2. Accede al directorio del proyecto:
   ```bash
   cd CalculadoraLegal
   ```
3. Instala las dependencias necesarias:
   ```bash
   pnpm install
   ```
4. Ejecuta el proyecto en un servidor de desarrollo:
   ```bash
   pnpm tauri dev
   ```

---

#### 6. **Flujo de Datos**
- **Entrada de Usuario:** Los componentes como `Input.jsx`, `Select.jsx` y `RadioButtons.jsx` capturan entradas del usuario.
- **Gestores de Estado:** El hook `useForm.js` administra el estado del formulario y realiza validaciones.
- **Interacciones con API:** `apiService.js` se encarga de enviar y recibir datos de APIs externas.
- **Renderizado Dinámico:** Los componentes procesan las entradas y actualizan la interfaz de usuario en tiempo real.

---

#### 7. **Prácticas de Desarrollo**
- **Componentes Modulares:** Cada funcionalidad está encapsulada en componentes reutilizables para mejorar la mantenibilidad.
- **Separación de Responsabilidades:** La lógica de negocio (como llamadas a la API) está separada en utilidades.
- **Estado Centralizado:** El hook `useForm.js` centraliza el manejo del estado del formulario, facilitando validaciones consistentes.

---

#### 8. **Pendientes y Recomendaciones**
- **Pruebas Unitarias:** Implementar pruebas para validar la funcionalidad de los componentes y hooks.
- **Optimizaciones:** Analizar el rendimiento de los componentes en flujos de datos complejos.
- **Documentación de API:** Si `apiService.js` interactúa con endpoints, agregar detalles sobre los mismos.

---


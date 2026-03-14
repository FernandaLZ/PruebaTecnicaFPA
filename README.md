# PruebaTecnicaFpalpha

Este proyecto fue generado usando **Angular CLI versión 19.2.22**. Se requiere Angular 19 para ejecutar y compilar correctamente la aplicación.


## Servidor de desarrollo

Para iniciar un servidor local:
```bash
ng serve
```

Luego abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques los archivos fuente.



## Estructura de carpetas

Organización del proyecto para que todo lo relacionado con clientes esté en un solo lugar, facilitando comprensión y mantenimiento:
```
clients
├─ components
├─ interfaces
├─ mapper
├─ pages
├─ pipes
└─ services

shared
├─ components
├─ interfaces
└─ router

Con esta estructura, el módulo de clientes funciona de forma independiente. Otros módulos pueden agregarse siguiendo la misma organización, manteniendo la aplicación ordenada y fácil de mantener.



## Patrón de diseño elegido

Toda la lógica de clientes se maneja en un solo lugar, mientras que los componentes se enfocan en mostrar los datos y reaccionar a los cambios del usuario. Esto permite que el código sea más organizado, predecible y fácil de actualizar.



## Librerías utilizadas

- **Tailwind CSS** — Permite crear estilos de manera rápida y consistente. Además, recursos como Flowbite proveen ejemplos de componentes listos para usar, facilitando la implementación con solo cambiar los datos.

- **Angular Material** — Se utilizó principalmente para diálogos (modales), ya que permite crear componentes funcionales y accesibles de manera sencilla, sin desarrollar toda la lógica y estilo desde cero. Esto agiliza el desarrollo y asegura una experiencia de usuario consistente.



## Uso de IA

- IA ayudó en la implementación del **dark mode**, ajustando colores para combinar con la tabla de Flowbite.
- Se usó IA para mejorar la **pipe de tiempo**, ajustando la función `pluralize` y corrigiendo errores en el manejo de fechas (`Date`).
- **Copilot** se utilizó para autocompletado y asegurar que todas las dependencias estuvieran correctamente importadas.
- Para la **paginación filtrada**, inicialmente se implementó manualmente, pero se usó IA para resolver la paginación con filtrado, ajustando las funciones que no se utilizaban.


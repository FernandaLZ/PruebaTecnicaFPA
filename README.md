# PruebaTecnicaFpalpha

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.22.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## ¿Porqué elegí esta estructua?
 -clients
  -components
  -interfaces
  -mapper
  -pages
  -pipes
  -services
-shared
  -components
  -interfaces
  -routes

Elegí organizar los archivos así para que todo lo relacionado con clientes esté junto en un solo lugar, lo que hace que sea más fácil entender y trabajar con ellos. Por ejemplo, los componentes, servicios y datos están todos agrupados, y lo que se comparte con otros módulos se pone en otra carpeta.

De esta manera, el módulo de clientes funciona de forma independiente, y si más adelante agregamos otros módulos, podemos seguir la misma forma de organizar todo, manteniendo la aplicación ordenada y fácil de mantener.

## ¿Porqué elegí este patron?

Elegí un patrón donde toda la lógica de los clientes se maneja en un solo lugar y los componentes solo se ocupan de mostrar los datos y reaccionar a los cambios del usuario. Esto permite mantener el código más organizado, predecible y fácil de actualizar.

## ¿Porqué elegí estas librerias?

-Tailwind
Elegí Tailwind porque me permite hacer los estilos de manera mucho más rápida y consistente. Además, hay recursos como Flowbite que dan ejemplos listos con esta librería, lo que facilita implementar componentes visuales solo cambiando los datos que necesito.

-Angular Material
Usé Angular Material principalmente para los diálogos, porque me permite crear modales funcionales y accesibles de manera sencilla, sin tener que construir toda la lógica y el estilo desde cero. Esto hace que el desarrollo sea más rápido y la experiencia del usuario más consistente.

## ¿IA?
Me orienté para guiarme en la mejor implementación del dark mode, ajustando los colores para que combinen con la tabla de Flowbite. También trabajé en la lógica de la pipe de tiempo, donde ajusté la función pluralize para mostrar los labels correctamente y corregí un error relacionado con el manejo de fechas (Date).

Además, utilicé copilot para el autocompletado para agilizar el desarrollo y asegurar que todas las dependencias estuvieran correctamente importadas.

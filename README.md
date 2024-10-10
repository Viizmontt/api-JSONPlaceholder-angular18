# TEST001

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


Indicación para la Gestión de Posts en Angular 18
Este código es un componente de Angular 18 que gestiona la creación, edición y eliminación de publicaciones (posts).

Paso I: Crear el Proyecto
Ejecuta el siguiente comando para crear un nuevo proyecto:
bash
Copiar código
ng new APIPOST

Paso II: Instalar Bootstrap
Puedes optar por Bootstrap u otros estilos personalizados. Para instalar Bootstrap, ejecuta:
bash
Copiar código
npm install bootstrap

Paso III: Anexar Bootstrap en angular.json
Modifica el archivo angular.json para incluir las rutas de Bootstrap. Asegúrate de que las secciones de "styles" y "scripts" se vean así:
json
Copiar código
"styles": [
  "src/styles.css",
  "bootstrap/dist/css/bootstrap.min.css" 
],
"scripts": [
  "bootstrap/dist/js/bootstrap.bundle.min.js"
]

Paso IV: Configurar app.config.ts
Importa el módulo necesario para la configuración del enrutador y la detección de cambios:

typescript
Copiar código
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
También, asegúrate de incluir el cliente HTTP:

typescript
Copiar código
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};

Paso V: Crear la Carpeta de Models
Crea una carpeta llamada model y dentro de ella, el archivo post.ts, donde se definirá la estructura de las propiedades del objeto Post.

Paso VI: Crear el Servicio para Consumir la API
Genera un servicio que permita consumir la API ejecutando el siguiente comando:
bash
Copiar código
ng g s service/post

Paso VII: Crear el Componente de Posts
Crea el componente para gestionar los posts utilizando el siguiente comando:
bash
Copiar código
ng g c post/posts

Paso VIII: Crear Métodos e Importar Módulos Necesarios
En el archivo post.component.ts, implementa los métodos necesarios e importa los módulos requeridos.

Paso IX: Crear el HTML para la Vista
Diseña la vista correspondiente en el archivo post.component.html.

Paso X: Probar la Aplicación
Finalmente, ejecuta tu aplicación y verifica que funcione correctamente.


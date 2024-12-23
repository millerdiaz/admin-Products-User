# Óptica Solución Visual - CRUD de Usuarios y Productos

Este proyecto forma parte de la aplicación "Óptica Solución Visual" y está diseñado para la gestión de usuarios y productos en una página web dedicada a la venta de gafas, lentes y medicamentos, así como para la programación de citas.

# Descripción General

El sistema cuenta con dos CRUDs independientes que permiten a los administradores y supervisores gestionar los datos necesarios para el funcionamiento de la plataforma:

CRUD de Usuarios: Gestiona el registro, actualización, eliminación y consulta de usuarios de la plataforma.

CRUD de Productos: Permite gestionar los productos disponibles, con funcionalidades de creación, edición, eliminación y consulta.

# Roles y Permisos

El sistema está diseñado con dos tipos de roles para garantizar el control adecuado sobre las operaciones:

Administrador: Tiene acceso completo a ambos CRUDs, lo que le permite gestionar tanto los usuarios como los productos.

Supervisor: Puede gestionar exclusivamente los productos, pero no tiene acceso a las funcionalidades relacionadas con los usuarios.

# Características Destacadas

Integración con una API externa: La información de los productos es alimentada por una API, asegurando que los datos estén actualizados y disponibles en tiempo real.

Filtro de búsqueda: Los productos se pueden filtrar por marca y modelo, facilitando la gestión y la localización rápida de información específica.

# Tecnologías Utilizadas

Backend: Node.js con Express.

Base de Datos: MongoDB.

Frontend: Angular (se utilizaron directamente Bootstrap y CSS para el diseño visual).

Herramientas Adicionales: Postman para pruebas, Git para control de versiones.


# ProductosOptica

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


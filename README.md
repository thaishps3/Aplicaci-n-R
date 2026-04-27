# Residencial SantGervasiParc

Aplicación web en desarrollo para apoyar la gestión diaria de tareas en una residencia de personas mayores.

El objetivo principal es facilitar el trabajo de auxiliares y coordinación mediante módulos simples, rápidos y pensados para lectura móvil.

## Objetivo del proyecto

Crear una aplicación práctica para registrar, consultar y organizar información diaria relacionada con la atención de residentes.

La aplicación debe priorizar:

- lectura rápida;
- pocos pasos;
- botones claros;
- información visible en móvil;
- reducción de errores por falta de comunicación;
- apoyo al trabajo diario sin distraer de la atención directa a los residentes.

## Conceptos principales

La aplicación separa claramente tres conceptos:

### Usuarios de la app

Son las personas que acceden al sistema.

Ejemplos:

- admin;
- auxiliares;
- coordinación.

Los usuarios pueden tener roles y permisos diferentes.

### Residentes

Son las personas mayores atendidas en la residencia.

Los residentes son compartidos por los distintos módulos de la aplicación.

### Módulos de trabajo

Son las pantallas funcionales de la aplicación.

Cada módulo debe resolver una tarea concreta y evitar mezclar responsabilidades.

## Módulos actuales

### BioSenior

Módulo para registrar y consultar información relacionada con:

- deposiciones;
- micciones;
- observaciones;
- alertas por residentes con dos días o más sin deposición;
- historial de registros.

### Planning

Módulo para organizar cuidados, tareas y seguimiento diario del turno.

## Módulos administrativos previstos

### Gestión de usuarios

Módulo futuro para que admin pueda gestionar:

- auxiliares;
- administradores;
- roles;
- PIN de acceso;
- backup de cuentas.

### Gestión de residentes

Módulo futuro para que admin pueda gestionar:

- alta de residentes;
- edición de residentes;
- eliminación de residentes;
- importación de residentes;
- exportación de residentes.

BioSenior y Planning deberán leer los residentes desde una fuente común.

## Módulos futuros posibles

### Mapa de comedor

Módulo pensado para visualizar rápidamente la asignación de mesas y asientos de cada residente.

Objetivo:

- saber en qué mesa se sienta cada residente;
- saber el asiento exacto;
- evitar confusión durante las comidas;
- permitir lectura rápida por parte de auxiliares.

La coordinadora o admin podría asignar mesas y asientos.  
Las auxiliares podrían consultar el mapa de forma rápida desde el móvil.

## Estado actual

Producto mínimo viable en proceso de limpieza y reorganización.

Actualmente se está trabajando en:

- limpieza de nombres y estructura;
- separación entre usuarios y residentes;
- mejora de legibilidad móvil;
- preparación para módulos administrativos separados;
- conservación de compatibilidad con los datos actuales.

## Tecnologías usadas

- HTML
- CSS
- JavaScript
- LocalStorage
- Git y GitHub

## Nota técnica

En algunas partes del código antiguo se mantiene el nombre interno `usuarios` por compatibilidad con versiones previas del MVP y con backups existentes.

En la interfaz visible se usará el término **residentes** para referirse a las personas mayores atendidas.
# Restserver entrevista

Este proyecto utiliza **Typescript** y un linter con el estilo de código [Standard](https://standardjs.com/)

## Configuración

Primero configurar los variables de enterno del archivo .env
- PORT : Es el puerto en el que se ejecutara nuestro servidor
- NODE_ENV: para saber si el archivo .env es entorno desarrollo o producion
- MSSQL_USER: Usuario de MSSQL
- MSSQL_PASSWORD: Contraseña de mssql
- MSSQL_DB: Nombre de la base de datos de mssql
- MSSQL_HOST: nombre del host o la ip
- MSSQL_DRIVER: el nombre del driver que se utilza (mssql)
- MSSQL_PORT: Numero del puerto del servidor de base de datos

## Comandos
 - Ejecute el comando `npm install` para descargar todas las dependencias del proyecto
 - Ejecute el comando `npm run dev` para un servidor en entorno desarollo
 - Ejecute el comando `npm run tsc` para generar los archivos de produccion. Estos archivos se guardaran en la carpeta `build/` del directorio
 - Ejecute el comadno `npm run start` abrir un servidor ejecutan los archivos de produccion de la carpeta `build/`


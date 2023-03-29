<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


 # Ejecutar en desarrollo

 1. Clonar el repositorio
 2. Ejecutar para instalar las dependencias (Depende de tu gestor de paquetes)

 ```
 npm install o yarn install 
 ```
 3. Tener Nest CLI instalado de manera global
 ```  
    npm install -g @nestjs/cli
```
 4. Levantar la base de datos de MongoDB
```
  docker-compose up -d
```
 5. Clonar el archivo ´´´.env.template´´´ y renombrarlo a ´´´.env´´´

 6. Llenar las variables de entorno definidas en el archivo ´´´.env´´´

 7. Ejecutar el comando para levantar el servidor en modo desarrollo
```
  npm run start:dev
```
  
 8.Reconstruir la base de datos con la semilla (seed)
```
    http://localhost:3000/api/v2/seed
```
 

  ## Stack de tecnologías
   *MongoDB
   *NestJS
   *TypeScript
   *Docker
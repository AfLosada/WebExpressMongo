**Pasos para ejecutar**

Vale la pena recalcar que es necesario tener instalados mongo, express y postman para poder probar todas las funcionalidades de este proyecto.

~~~~
npm install express
npm install body-parser
npm install mongodb
mongoimport --db pruebas --collection countries --file countriesall.json
~~~~

Luego se ejecuta el archivo app.js con

~~~~
node app.js
~~~~

Y se pueden ejecutar las pruebas de Postman al importar el archivo "paraWeb.postman_collection".
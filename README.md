# **sist_dist_2-2020**
## Trabajo de Cátedra para Sistemas Distribuidos 2°Sem 2020
## - Integrantes:  Carlos Alvarez - Vicente Brevis
## - Profesor: Arturo Terra Vásquez
---
## Librerías utilizadas
* Se utiliza *Node.js* para el módulo de backend por su facilidad de uso, la gran cantidad de material de apoyo y la posibilidad de incluir una gran variedad de librerías para añadir características al programa final, lo que será de utilidad en la siguiente parte de la evaluación.
* Se usa *Express.js* para manejo de rutas, integración de motores de base de datos y como framework de middleware.
* Se utiliza *Nodemon* como apoyo al desarrollo del programa (esta herramienta reinicia la aplicación automáticamente cada vez que se cambia un archivo en el código fuente de la aplicación).
* Se utiliza *Pug.js* como motor de plantillas para el desarrollo del formulario de ingreso (frontend de la aplicación).
* Se utiliza el paquete *body-parser* para guardar la información proveniente del formulario y poder enviarla al módulo backend.
* Se utiliza el módulo *express-validator* para sanitizar y validar la información de entrada en el formulario.
* Se usa *rut.js* para sanitizar y validar una entrada de rut chileno, se utiliza como parte de funciones customizadas con express-validator.
* Se utiliza *Bootstrap* para otorgar
* Se utiliza *sequalize* como interfaz para manejar la base de datos en postgresql.
* Se utiliza *server.js* para el envío de correo electrónico.
---
## Instrucciones de uso

POSTGRES_PASSWORD
POSTGRES_USER
POSTGRES_DB

docker run -it --rm -d -e POSTGRES_DB=dist2_2020 -e POSTGRES_USER=test -e POSTGRES_PASSWORD=abc123 -p 5432:5432 postgres
fuser -k 3000/tcp
fuser -k 5432/tcp
sudo kill $(sudo lsof -t -i:5432)

docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
docker run -it --rm -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=mysecretpassword postgres

https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application 
https://docs.docker.com/compose/environment-variables/#the-env-file
https://stackoverflow.com/questions/41485217/mount-current-directory-as-a-volume-in-docker-on-windows-10

docker run --rm -it -v $(pwd)/docker_data/postgres:/var/lib/postgresql/data




Para ejecutar en modo de desarrollo usar el comando ***"npm run watch"*** , esto ejecutará el programa en la página [*https://localhost:3000*](https://localhost:3000), al mismo tiempo la herramienta  *nodemon* buscará cambios en los archivos y "recompilar" la aplicación con los nuevos cambios.
Se debe crear una base de datos en postgresql de forma manual, las credenciales de la base de datos creada se debe cambiar en el archivo *"src/config/database.js"*. Para crear las tablas se utilizan los siguientes comandos:
```
CREATE TABLE IF NOT EXISTS PEOPLE( 
	RUT 	  TEXT             NOT NULL,
	FIRSTNAME TEXT             NOT NULL,
	EMAIL     TEXT             NOT NULL,
	ADRESS    TEXT             NOT NULL
);

CREATE TABLE IF NOT EXISTS PERMISSIONS(
	ID SERIAL PRIMARY KEY,
	RUT 	 TEXT          NOT NULL,
	MOTIVO   TEXT          NOT NULL,
	DATE_EXT TIMESTAMP     NOT NULL,
	ADRESS   TEXT          NOT NULL
);
```
---
## Análisis de sistema
Para hacer el análisis del sistema programado se procede a listar las características de un sistema distribuido, y luego indicar si se cumple dicha característica en el programa presentado:
* Disponibilidad de recursos: característica que indica que un sistema distribuido debe facilitar el acceso a los recursos remotos de forma eficiente. Se utiliza Express.js como un middleware para manejar enrutamiento, pero se requiere de una aplicación de manejo de recursos para manejar la carga percibida por la aplicación, por lo que para el caso particular no se podría decir que se cumple de forma completa la disponibilidad de recursos.
* Transparencia: un sistema distribuido debe aparentar ser un sistema único e infalible. Bajo este concepto se desprenden 8 tipos de transparencia:
> * Transparencia de acceso: el sistema puede obtener objetos que están "remotamente" en la base de datos como si estuviesen de forma "local" en el computador, sin importar el lenguaje en el que se encuentran descritos, esto en teoría se cumple como parte de la implementación usando patron MVC, por lo que se puede decir que es transparente en ese sentido.
> * Transparencia de ubicación: un sistema distribuido puede obtener acceso a sus recursos sin que el usuario descubra en qué sitio se encuentra, para el caso del sistema a evaluar esto se cumple únicamente porque solo hay una base de datos que se puede consumir, en caso de incluir una nueva base de datos se va a requerir de un gestor de información para las bases de datos.
> * Transparencia de migración: un sistema distribuido no se ve afectado si uno de sus recursos de información cambia, lo cual no ocurre para el caso actual que solo presenta una base de datos, por lo que el mantenimiento en la misma detendría el funcionamiento normal del sistema, en caso de que se use más de una instancia de base de datos y estas están organizadas con un gestor pueden ser mantenidas sin afectar el funcionamiento del sistema.
> * Transparencia de reubicación: un sistema distribuido permite el uso de un recurso aún si su ubicación se está cambiando, lo cual no sería posible con el sistema actual con solo una base de datos, para que fuese transparente en ese sentido debería haber al menos una réplica del recurso que se requiere mover de lugar.
> * Transparencia de replicación: un sistema distribuido debe poder permitir la creación y uso de réplicas sin que el usuario note la existencia de esta, más como el sistema funciona únicamente con solo una instancia de base de datos, no  es posible indicar que es transparente en replicación.
> * Transparencia de concurrencia: en base a la forma en la que "express.js" y el motor de búsqueda de postgresql funcionan se puede decir que existe un cierto grado de concurrencia al momento de ejecutar las tareas dentro del sistema.
> * Transparencia de fallos: en caso de fallo el sistema no podría completar la tarea encargada, y en su lugar solo entregaría un mensaje error como respuesta, por lo que no tendría transparencia a fallos.
> * Transparencia de persistencia: un sistema distribuido debe ser capaz de disimular el hecho de que sus recursos no están todo el tiempo activos, lo cual no ocurre con el sistema actual, el cual es principalmente reactivo en sus respuestas y solo funciona cuando todas sus partes están activas.
* Apertura: característica que denota la posibilidad de aumentar las características de la aplicación, esta característica se separa en tres:
> * Interoperabilidad: un sistema distribuido debe permitir que otros procesos que realizan las mismas funciones pero con diferente implementación puedan ser incluidas dentro del sistema. Esto efectivamente ocurre en el sistema actual debido a las librerías de enrutamiento y de sequalize como interfaz de base de datos, ya que en teoría deberían soportar otras bases de datos y otros tipos de comunicación que soporten enrutamiento web entre componentes.
> * Portabilidad: las componentes adicionales deben tener un acoplamiento lo suficientemente bajo como para poder ser utilizados en otros sistemas, lo cual ocurre principalmente con la conexión a base de datos, la cual ocurre con la suficiente independencia como para ser reemplazada con otro motor de base de datos sin afectar el resto del código.
> * Fácil extensión: un sistema distribuido debiera permitir el ingreso de nuevos componentes, lo cual ocurre en el sistema actual debido a la naturaleza de node.js y su facilidad en búsqueda y creación de librerías, las cuales a su vez se pueden conectar a más componentes, facilitando la extensión de nuevas características.
* Escalabilidad: denota la facilidad de aumentar las capacidades de cómputo de la aplicación, existen dos formas de aumentar escalabilidad, escalabilidad vertical y horizontal.
> * La escalabilidad vertical implica el aumento de capacidades por medio del aumento de hardware involucrado en el cómputo de la aplicación, la cual para el caso particular debiese ser posible debido a la naturaleza de las herramientas utilizadas, que pueden aprovechar un aumento en la plataformas físicas.
> * La escalabilidad horizontal es el segundo tipo de escalabilidad e implica la integración de varios servidores trabajando en conjunto, lo cual no es posible con la configuración actual de la aplicación, la cual realiza las consultas por medio de urls específicas a módulos exclusivos dentro de la aplicación. Esto puede cambiar al añadir un gestor de carga que administre la comunicación de los mensajes entre módulos.

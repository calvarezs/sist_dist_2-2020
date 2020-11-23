#!/bin/bash

# Test de carga usando apache benchmark
# En caso de que no este instalado ejecutar el comando "apt-get install apache2-utils"
# Si no se puede ejecutar el comando "chmod u+x load_test.sh" lo volverá ejecutable
# Para ejecutar utilizar el comando "./load_test.sh"


ab -n 100 -c 10 http://localhost:3000/ > resultado_test_carga_1.txt 
ab -n 100 -c 10 -p data_load_test.json -T application/json -rk http://localhost:3000/ > resultado_test_carga_2.txt
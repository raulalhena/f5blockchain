
# Tecnología Blockchain

Proyecto usado para exposición de tecnología blockchain. Se muestran las diferentes ramas del desarrollo en este campo:

- Desarrollo de blockchain
- Desarrollo de Smart Contracts
- Desarrollo de dApps

***
Contiene:

Una Blockchain con las funcionalidades básicas de minado y transferencia.

Un explorador de blockchain donde visualizar y crear bloques a través de una API realizada con Express y un cliente creado con React + Vite.

Está el código y el acceso a un Smart Contract, creado con Solidity, y que conecta a una red de testing donde podrás probar las funcionalidades accediendo directamente a una Blockchain real.

Hay una dApp (descentralized Application) que conecta con el gestor de wallets Metamask y usa el Smart Contract realizando operaciones y mostrandolas al cliente (React + Vite).

## Lenguajes de programación:

- JavaScript
- Typescript
- Solidity

## Tecnologías usadas:

- NodeJS
- Express
- React + Vite
- Websockets (Socket.io)

## Requerimientos

Tener instalado: 

- [NodeJS](https://nodejs.org/)
- npm 
- [Metamask](https://metamask.io) (Necesario para la dApp y desplegar e interactuar con el Smart Contract)
- [Postman](https://postman.com) (Opcional para ejecutar las queries contra la API) [Queries de Postman](https://github.com/raulalhena/f5blockchain/blob/main/postman/Blockchain.postman_collection.json)

## 1. Block Chain CLI (Command Line Interface)

Archivos que encontrarás en la aplicación:

- Blockchain.js
  - Clase Blockchain con los métodos: 
    - createGenesisBlock(): Crea el bloque 0 para incializar la cadena de bloques.
    - getLatestBlock(): Devuelve el último bloque de la cadena de bloques.
    - minePendingTransactions(miningRewardAddress): Mina el bloque y crea la transacción de recompensa para el minero.
    - addTransactions(transactions): Añade transacciones al pool para que sean procesadas y añadidas al nuevo bloque.
    - getBalanceOfAddress(address): Incrementa o decrementa la cantidad de monedas de la wallet pasada como argumento.
    - isChainValid(): Devuelve true en caso de que los datos no se hayan modificado después de haberlos minado, y false en caso contrario.
  - Clase Block con los métodos:
  - Clase Transaction con los métodos:
- main.js
  - Se aplica la lógica de simulación de transacciones y movimientos en la blockchain. En este archivo puedes realizar las pruebas para entender el funcionamiento de la blockchain.
- keygenerator.js
  - Script para poder crear unas claves privadas y públicas validas. Se muestrán en consola para que las puedas copiar en algún archivo.

### Pasos a seguir

1. Clonamos el respotorio desde github

```
    git clone https://github.com/raulalhena/f5blockchain.git
```

2. Entramos al directorio raíz del proyecto

```
    cd f5blockchain
```

3. Accedemos al directorio de la aplicación de blockchain

```
    cd cli_app
```

4. Ejecutamos el comando para instalar todas las dependencias necesarias para ejecutar el proyecto

```
    npm install
```
5. Ejecutamos el archivo main.js donde se encuentra la lógica del uso de la cadena de bloques


## 3. Simulador de minería en red CLI y Web (Experimental)

Archivos que encontrarás en la aplicación:

- /client/cli_client
  - Block.js
    - Clase Block para la funcionalidad del minado.
- socket_client.js
  - Gestión de la conexión al servidor de Websockets y la suscripción y emisión de los eventos.
- app.js
  - Iniciación de la aplicación.

### Pasos a seguir

__Si ya has clonado el repositorio no es necesario que lo hagas de nuevo. Salta al paso 2__

1. Clonamos el respotorio desde github

```
    git clone https://github.com/raulalhena/f5blockchain.git
```

2. Entramos al directorio raíz del proyecto

```
    cd f5blockchain
```

3. Accedemos al directorio de la aplicación de blockchain

```
    cd remote_blockchain
```

4. Accedemos al directorio de la aplicación servidor

```
    cd server
```

5. Ejecutamos el comando para instalar todas las dependencias necesarias para ejecutar el proyecto

```
    npm install
```

6. Ejecutamos la aplicacion de servidor que quedará a la espera de conexiones que irá mostrando por consola a medida que se registren.

```
    node server.js
```

7. Accedemos al directorio de la aplicación cliente

```
    cd ../client
```

8. Ejecutamos el comando para instalar todas las dependencias necesarias para ejecutar el proyecto

```
    npm install
```

9. Accedemos al directorio de la aplicación de linea de comandos cliente

```
    cd cli_client
```

10. Ejecutamos la aplicación con el flag -u seguido del nombre de usuario que nos identificará. Quedará a la espera de recibir un hash que encontrar (minar).

```
    node app.js -u [NOMBRE_USUARIO]
```

11. Accedemos al directorio del admin

```
    cd ../cli_admin
```

1.  Ejecutamos la aplicación con los flag -d (dificultad, (obligatorio)), -t (transacciones, (opcional)), -p (previousHash, (opcional)). Se añaden estos datos variables para dar mas aletoreidad a la creación del hash, si -t o -p no son usados se aplican valores por defecto.

```
    node app.js -d [DIFICULTAD(numero entero)]
```

Una vez ejecutada muestra el ganador, que será el primer minero que encuentre el hash propuesto. Para poder realizar otro minado, pulsar CTRL + C para parar la aplicación y ejecutarla de nuevo con los mismos o otros parametros.

**ATENCION: Hay que tener cuidado con el nivel de dificultad que añadimos puede hacer que el PC se quede bloqueado, ir subiendo desde 2 de uno en uno para ver el comportamiento de nuestro computador al procesado de la encriptación.**


## 2. Apps: Explorador de Blockchain / dApp / Smart Contract
### Paso a seguir:

__Si ya has clonado el repositorio no es necesario que lo hagas de nuevo. Salta al paso 2__

1. Clonamos el respotorio desde github

```
    git clone https://github.com/raulalhena/f5blockchain.git
```

2. Entramos al directorio raíz del proyecto

```
    cd f5blockchain
```

3. Accedemos al directorio de backend donde se encuentra el servidor

```
    cd backend
```

4. Ejecutamos el comando para instalar todas las dependencias necesarias para ejecutar el proyecto

```
    npm install
```

5. Ejecutamos el servidor

```
    npm run start
```

6. Accedemos al directorio de frontend

```
    cd ../frontend
```

7. Ejecutamos el cliente para poder hacer peticiones al backend

```
    npm run dev
```

8. Acceder a la aplicación frontend pulsando el enlace que se nos muestra o copiando la url en la barra del navegdor

```
    Local:  http://localhost:5173
```

### Rutas

/ ó /home -> Al entrar en la app encontrarás la presentación que está relacionada con este repositorio.

/explorer -> Explorador de la cadena de bloques que se ejecuta en el backend. Puedes ver la información de los bloques y acceder a ellos para obtener la información de las transacciones y los wallets.

/smartcontracts -> Información sobre la dirección del contrato en la red de test de Ethereum (Sepolia), un enlace al editor online Remix y al código de la librería Openzeppelin para el estandar de token ERC20. También encontrarás un ejemplo de implementación de Smart Contract para crear tu propio token y el ABI correspondiente.

/dapps -> Interfaz de una aplicación con acceso al Smart Contract que indiquemos en el campo. Nos muestra el nombre del token, su símbolo y el suministro total. Es necesario tener instalado el gestor de wallets Metamask como extensión del navegador para que funcione, al acceder a la página, abajo a la izquierda muestra un mensaje si la ha detectado o no.

Nos muestra el saldo de la wallet que tengamos seleccionada en Metamask del token correspondiente al contrato que hemos introducido.

Se pueden realizar transferencias del token, introduciendo la wallet de destino y la cantidad de tokens que queremos transferir.

## Endpoints de la API de la blockchain

**/api/blocks** -> 
- GET: 
  - Request: -
  - Response: Devuelve todos los bloques existentes (minados) en la Blockchain. 

```JSON
[
    {
        "timestamp": 1693695018494,
        "transactions": "Genesis Block",
        "previousHash": "0",
        "hash": "56d29c4191921f4b5fcd1199e8530f4f61cf4d8633bb9db7690356e9a215630d",
        "nonce": 0
    }
]
```

**/api/blocks/last** -> 
- GET: 
  - Request: -
  - Response: Devuelve la información del último bloque de la cadena.

```JSON
[
    {
        "timestamp": 1693695018494,
        "transactions": "Genesis Block",
        "previousHash": "0",
        "hash": "56d29c4191921f4b5fcd1199e8530f4f61cf4d8633bb9db7690356e9a215630d",
        "nonce": 0
    }
]
```

**/api/blocks/valid** -> 
- GET: 
  - Request: -
  - Response: Devuelve campo con true o false según si la cadena es válida o no. 

```JSON
{
    "isChainValid": true
}
```



**/api/transactions** -> 
- POST: 
  - Request: 
    - fromAddress - String: Dirección válida (clave pública) de una wallet, desde donde se envían las monedas.
    - toAddress - String: Dirección válida (clave pública) de una wallet, a donde se envían las monedas.
    - amount - Number: Cantidad de monedas a enviar.
  
```JSON
{
    "fromAddress": "045bcb4ab624148c3fed23f1109fabf9adc180ed05377505489441d199e95c65d011b223e8922b26dc7de8c998a50e2d1d0ce59c73320e57c900f0ff33b3fc8286",
    "toAddress": "04299db66fa52322e450509476cfbb1fadda7bb1a749d58a865e9a0680cc0a8089cb6f7b9b6d20e9ee9215b390973cee81c8039ce788561d32d8e1c0c9f5a4ff4b",
    "amount": 8
}
```
  - Response: Devuelve un array con las transacciones solicitadas con el hash y ls firma, y la transacción realizada al minero que ha creado el bloque.

```JSON
[
    {
        "fromAddress": "045bcb4ab624148c3fed23f1109fabf9adc180ed05377505489441d199e95c65d011b223e8922b26dc7de8c998a50e2d1d0ce59c73320e57c900f0ff33b3fc8286",
        "toAddress": "04299db66fa52322e450509476cfbb1fadda7bb1a749d58a865e9a0680cc0a8089cb6f7b9b6d20e9ee9215b390973cee81c8039ce788561d32d8e1c0c9f5a4ff4b",
        "amount": 8,
        "hash": "ea616b5a019d3ffb75aef806f3bc56d17a4296cc712f0c3d2ff011ff6a843671",
        "signature": "3045022100a8830e57b15bca51762ddf635e48ee6c7c95c5659caf41b50cfa3feb8cae47a20220390491255f81b89039eb696e8f4a81b1226ffebd14a97a68eec5f2ac5dc58ae3"
    },
    {
        "fromAddress": "F5SCOIN11111111111111",
        "toAddress": "045bcb4ab624148c3fed23f1109fabf9adc180ed05377505489441d199e95c65d011b223e8922b26dc7de8c998a50e2d1d0ce59c73320e57c900f0ff33b3fc8286",
        "amount": 100,
        "hash": ""
    }
]
```

# Licencia

Esta aplicación está bajo la licencia [MIT License](https://github.com/raulalhena/f5blockchain/blob/main/MITLicense)
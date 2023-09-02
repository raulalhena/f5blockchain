import Blockchain from "./Blockchain.js";
import Block from "./Block.js";

const main = () => {
    // Instanciamos la blockchain
    const f5scoin = new Blockchain();

    // Añadimos un nuevo bloque con el indice del bloque anterior + 1, la fecha y data: un objeto con la propiedad amount igual a 100
    f5scoin.addBlock(new Block(f5scoin.getLatestBlock().index + 1, '02/09/23', { amount: 100 } ));

    // Añadimos un nuevo bloque
    f5scoin.addBlock(new Block(f5scoin.getLatestBlock().index + 1, '03/09/23', { amount: 10 } ));

    // Mostramos la cadena de bloques
    console.log(f5scoin.chain);
    console.log(`Is a valid blockchain? ${f5scoin.isChainValid()}`);

    // INTENTAMOS HACKEAR LA BLOCKCHAIN (INMUTABILIDAD) //

    // 1. Comprobamos si se ha modificado los datos y se mantiene la integridad de los hash del bloque modificado
    // f5scoin.chain[1].data = { amount: 250 };
    // 2. Recalculamos el hash para ver si podemos modificarlo y así hacer que nuestro cambio se valide
    // f5scoin.chain[1].hash = f5scoin.chain[1].calculateHash();
    // console.log(`Bloque con los datos modificados ${JSON.stringify(f5scoin.chain[1], null, 4)}\n`);
    // console.log(`Is a valid blockchain? ${f5scoin.isChainValid()}`);

    





};

main();
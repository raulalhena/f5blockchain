import Blockchain from "./Blockchain.js";
import Block from "./Block.js";

const main = () => {
    // Instanciamos la blockchain
    const f5scoin = new Blockchain();

    // Informamos del inicio del minado y calculamos el tiempo que tarda
    console.log('\n>>>>> MINANDO BLOQUE <<<<<\n');
    console.time('Time elapsed Block 1');
    console.log(`Mining block ${f5scoin.chain.length - 1}...`);
    // Añadimos un nuevo bloque con el indice del bloque anterior + 1, la fecha y data: un objeto con la propiedad amount igual a 100
    f5scoin.addBlock(new Block(f5scoin.getLatestBlock().index + 1, '02/09/23', { amount: 100 } ));
    console.timeEnd('Time elapsed Block 1');

    // Informamos del inicio del minado y calculamos el tiempo que tarda
    console.log('\n>>>>> MINANDO BLOQUE <<<<<\n');
    console.time('Time elpased Block 2');
    console.log(`Mining block ${f5scoin.chain.length - 1}...`);
    // Añadimos un nuevo bloque
    f5scoin.addBlock(new Block(f5scoin.getLatestBlock().index + 1, '03/09/23', { amount: 10 } ));
    console.timeEnd('Time elpased Block 2');

    // Mostramos la cadena de bloques
    console.log('\n>>>>> BLOQUES DE LA BLOCKCHAIN <<<<<\n');
    console.log(f5scoin.chain);
    console.log('\n>>>>> VALIDACION DE LA BLOCKCHAIN <<<<<\n');
    console.log(`Is a valid blockchain? ${f5scoin.isChainValid()}\n`);

    // INTENTAMOS HACKEAR LA BLOCKCHAIN (INMUTABILIDAD) //

    // 1. Comprobamos si se ha modificado los datos y se mantiene la integridad de los hash del bloque modificado
    // f5scoin.chain[1].data = { amount: 250 };
    // 2. Recalculamos el hash para ver si podemos modificarlo y así hacer que nuestro cambio se valide
    // f5scoin.chain[1].hash = f5scoin.chain[1].calculateHash();
    // console.log(`Bloque con los datos modificados ${JSON.stringify(f5scoin.chain[1], null, 4)}\n`);
    // console.log(`Is a valid blockchain? ${f5scoin.isChainValid()}`);


    





};

main();
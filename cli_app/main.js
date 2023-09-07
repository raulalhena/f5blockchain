import Blockchain from "./Blockchain.js";
import Transaction from './Transaction.js';
import elliptic from 'elliptic';

const EC = elliptic.ec;
const ec = new EC('secp256k1');

const main = () => {
    // Instanciamos la blockchain
    const f5scoin = new Blockchain();

    // Creamos las claves de la wallet
    // Privada
    const myPrivateKey = ec.keyFromPrivate('e46873a2895a79cb60fc70198f8919209ff74daf3ec394cd7bfb21b442196ea2');
    // Publica, la usamos como dirección a la que nos van a enviar las monedas
    const myWalletAddress = myPrivateKey.getPublic('hex');

    // Creamos transacciones
    const tx1 = new Transaction(myWalletAddress, 'myWalletAddress', 5);
    // Firmamos la transacción
    tx1.signTransaction(myPrivateKey);
    // Añadimos la transacción a la blockchain
    f5scoin.addTransactions(tx1);

    // Iniciamos el minado 1er bloque
    console.time('Tiempo transcurrido minando 1');
    console.log(`\n\n****************************************************`);
    console.log(' >>>> Iniciamos minado del primer bloque... <<<<');
    console.log(`****************************************************`);

    // Comprobamos todas las transacciones pendientes y las gestionamos
    f5scoin.minePendingTransactions(myWalletAddress);
    console.timeEnd('Tiempo transcurrido minando 1');

    // Obtenemos el balance de la wallet
    console.log(`El balance de la mi wallet es: ${f5scoin.getBalanceOfAddress(myWalletAddress)}`);

    // >>>> CREAMOS MAS TRANSACCIONES <<<<< //

    // Creamos transacciones
    const tx2 = new Transaction(myWalletAddress, 'myWalletAddress', 25);
    // Firmamos la transacción
    tx2.signTransaction(myPrivateKey);
    // Añadimos la transacción a la blockchain
    f5scoin.addTransactions(tx2);

    // Iniciamos el minado 1er bloque
    console.time('Tiempo transcurrido minando 2');
    console.log(`\n\n****************************************************`);
    console.log(' >>>> Iniciamos minado del segundo bloque... <<<<');
    console.log(`****************************************************`);

    // Comprobamos todas las transacciones pendientes y las gestionamos
    f5scoin.minePendingTransactions(myWalletAddress);
    console.timeEnd('Tiempo transcurrido minando 2');

    // Obtenemos el balance de la wallet
    console.log(`El balance de la mi wallet es: ${f5scoin.getBalanceOfAddress(myWalletAddress)}`);

    console.log(`\n\n********************************************`);
    console.log(` >>>> Bloques minados en la Blockchain <<<< `);
    console.log(`********************************************`);
    for(let i = 0; i < f5scoin.chain.length; i++) {
        console.log(`\n\n************************`);
        console.log(` >>>> Bloque ${i} <<<< `);
        console.log(`************************\n`);
        console.log(`${JSON.stringify(f5scoin.chain[i], null, 4)}`);
    }
    // console.log(`Los bloques que componen la blockchain: \n `, f5scoin.chain);

    

    // INTENTAMOS HACKEAR LA BLOCKCHAIN //

    // Modificamos una transacción una vez ya añadida a la blockchain
    // f5scoin.chain[1].transactions[0].amount = 1000000;

    console.log(`\n\n >>>> Comprobamos si la Blockchain es válida ${f5scoin.isChainValid()}`);



};

main();
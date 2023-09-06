/*
    ADMIN APP
*/

import { initAdmin } from "./admin.js";

const app = () => {
    const args = {
        timestamp: Date.now(),
        transactions: 1,
        previousHash: 1,
        difficulty: ''
    }

    if(process.argv.length === 2) {
        console.error('Se esperaba como mínimo 1 argumento: -d [número entero], debe introducirse');
        process.exit(1);
    }

    const dIndex = process.argv.indexOf('-d');
    if(dIndex) args.difficulty = process.argv[dIndex + 1];

    initAdmin(args);
}

app();
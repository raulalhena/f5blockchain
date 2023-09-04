const ethers = require("ethers");
const mnemonic = "";
const mnemonicWallet = ethers.Wallet.fromPhrase(mnemonic);
console.log(mnemonicWallet.privateKey);
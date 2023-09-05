const ethers = require("ethers");
const mnemonic = "YOUR MNEMONIC";
const mnemonicWallet = ethers.Wallet.fromPhrase(mnemonic);
console.log(mnemonicWallet.privateKey);
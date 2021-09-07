// const Crypto= require("crypto-js");
// const CryptoAES= Crypto.AES;
// const CryptoEnc= Crypto.enc;

// const ciphertext= CryptoAES.encrypt("ngon vai***",  "fc1331550b7a1cea25b889c2").toString();
// console.log(ciphertext);

// const briginalText= CryptoAES.decrypt(ciphertext, "fc1331550b7a1cea25b889c2").toString(CryptoEnc.Utf8);
// console.log(briginalText);

const bcrypt= require('bcrypt')
const SECRET_KEY= "fc1331550b7a1cea25b889c2";
const password= "Phong1234";
const encode = bcrypt.hashSync(password, 10);
console.log(encode);

var compareBcrypt= bcrypt.compareSync(password, encode);
console.log(compareBcrypt);

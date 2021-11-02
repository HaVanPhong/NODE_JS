const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./key/privatekey.pem');
const pubkey = fs.readFileSync('./key/pubkey.crt');
//=======
const prikey = fs.readFileSync('./key/domain.key',{encoding: 'utf-8'})
const publicKey = fs.readFileSync('./key/domain.csr',{encoding: 'utf-8'});

let token = jwt.sign({ name: 'admin' }, prikey, { algorithm: 'RS256'});
console.log(token);

let decodeToken = jwt.verify(token, publicKey, { algorithms: ['RS256']});
console.log(decodeToken)

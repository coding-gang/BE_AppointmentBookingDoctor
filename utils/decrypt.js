const bcrypt = require('bcrypt');

 class decrypt{
    constructor(encryptText,hash){
        this.encryptText = encryptText;
        this.hash = hash;
    }
    async decryptFunc() {
        const textDecrypt = await bcrypt.compareSync(this.encryptText,this.hash,(err,result)=>{
            if(err) throw err;
            return result;
        })
        return textDecrypt;
    }
}
module.exports = decrypt;


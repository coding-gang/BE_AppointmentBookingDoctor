const bcrypt = require('bcrypt');

 class encrypt{
    constructor(encryptText,saltRounds=10){
         this.encryptText = encryptText;
        this.saltRounds = saltRounds;
       
    }
     async encryptFunc(){
        const result = await bcrypt.hashSync(this.encryptText, this.saltRounds,(err,hash)=>{
            if(err) throw err;
            return hash;
        })
        return result;
        // const hash = bcrypt.hashSync(this.encryptText, this.saltRounds);
        // return hash;
    }        
}
module.exports = encrypt;
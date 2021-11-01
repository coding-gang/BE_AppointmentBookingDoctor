class Error{
    constructor(statusCode,message){
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.message = message;
    }
   resError(){
      return {
          error:{
            status: this.status,
            message:this.message
           },
           statusCode : this.statusCode
        }
   }
}

module.exports = Error;
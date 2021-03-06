
class APIFeatures {
    constructor(query,querytString) {
      this.query = query;
      this.querytString = querytString;
    }
    
    sort() {
      if (this.querytString.sort) {
        const sort =['lastName','firstName','-astName','-firstName','speciallityName','-speciallityName'];
        const sortBy = this.querytString.sort.split(',');
        sortBy.forEach(element => {
             if(sort.includes(element)){
                  if(element.charAt(0) == '-'){
                     const newElement =  element.replace('-','').trim();
                    this.query.sort((a,b)=>(a[newElement] > b[newElement] ? -1 : 1))
                  }
                else{
                    this.query.sort((a,b)=>(a[element] > b[element] ? 1 : -1)) 
                }
                 
             }
        });
    }
    return this;
}
    fields(){
        if (this.querytString.fields_speciallity){
           if(Object.entries(this.querytString.fields_speciallity).length > 3) {
            const fields = this.querytString.fields_speciallity.split(',');
            let tmpSpec = [];
            console.log(fields);
              fields.forEach(el=>{    
                  const dataFilter = this.query.filter((item) => {
              return  item.speciallityName.toLowerCase() == el.toLowerCase()
              })
               dataFilter.forEach(item => tmpSpec.push(item))
              })
             this.query = tmpSpec;
           }
       }
       return this;
    }
  
    limitFields() {
      if (this.querytString.fieldsLimit) {
           this.query =  this.query.slice(0,this.querytString.fieldsLimit)
    }
    return this;
    }
     
    search(){
        if(this.querytString.search){
          
        }
    }

  }
  
  module.exports = APIFeatures;
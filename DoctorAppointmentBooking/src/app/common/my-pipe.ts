import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';


@Pipe({name:"myDatePipe"})

export class MyPipeDate implements PipeTransform{
   thang:string ='' 
   dateFormat :string=''
       transform(date: Date ){
           let month = date.getMonth();     
           this.thang = getMonth(month);
            this.dateFormat = `Ngày ${date.getUTCDate()} ${this.thang} Năm ${date.getFullYear()}`;
            console.log(this.dateFormat);
            return this.dateFormat;
       }
}   

function getMonth(month:number):string{
    let thang:string ='';
    switch(month){
        case 0: 
          thang ="Tháng 1"
          break;
        case 1: 
          thang ="Tháng 2"
          break;
        case 2: 
          thang ="Tháng 3"
          break;
        case 3: 
          thang ="Tháng 4"
          break;  
        case 4: 
          thang ="Tháng 5"
          break;
        case 5: 
          thang ="Tháng 6"
          break;
        case 6: 
          thang ="Tháng 7"
          break;
        case 7: 
         thang ="Tháng 8"
          break;
        case 8: 
          thang ="Tháng 9"
          break;
        case 9: 
         thang ="Tháng 10"
          break;
        case 10: 
          thang ="Tháng 11"
          break;
        case 11: 
          thang ="Tháng 12"
          break;   
    };
    return thang;
}
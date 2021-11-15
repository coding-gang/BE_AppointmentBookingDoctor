import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';


@Pipe({name:"myTimePipe"})

export class MyTimePipe implements PipeTransform{
  transform(time: string ){
     const arrDate =  time.split(':')
     return `${arrDate[0]}:${arrDate[1]}`

  }
}


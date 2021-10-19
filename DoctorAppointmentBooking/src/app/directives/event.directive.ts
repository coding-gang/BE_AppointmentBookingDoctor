import {Directive ,ElementRef,HostListener,Input} from "@angular/core";
import { DoctorFileComponent } from "../components/doctor-file/doctor-file.component";
@Directive({
  selector:'[eventHover]'
})

export class EventHoverDirective{
  @Input() eventHover:number = 0;
   constructor(private el:ElementRef , private doctorFile:DoctorFileComponent){
   }
       @HostListener('mouseenter')onMouseHover(){
        this.doctorFile.open(this.eventHover);
        this.el.nativeElement.style.cursor ='pointer';
       }

}

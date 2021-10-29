import { Component, OnInit, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-modalconfirm-doctor',
  templateUrl: './modalconfirm-doctor.component.html',
  styleUrls: ['./modalconfirm-doctor.component.css']
})
export class ModalconfirmDoctorComponent implements OnInit {
  isOpenModal:boolean =false;
  @Output() save = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  openModal(){
   this.isOpenModal =true;
  }
  closeModal(){
  this.isOpenModal =false;
  }
  acptModal(){
    this.save.emit("save");
  }
}

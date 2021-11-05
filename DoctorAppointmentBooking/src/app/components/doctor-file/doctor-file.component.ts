import { Component, Input, OnInit, } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
const PATH ='../../../assets/img/features/';


interface album{
  src: string,
  caption: string,
  thumb:string
}

@Component({
  selector: 'app-doctor-file',
  templateUrl: './doctor-file.component.html'
})

export class DoctorFileComponent implements OnInit {

  public _albums:Array<album> = [];
  isBar = true;
  @Input() name:string ='';

  constructor(private _lightbox:Lightbox) {

    for (let i = 1; i <= 4; i++) {
      const src = `${PATH}feature-0${i}.jpg`;
      const caption = 'Image' + `feature-0${i}.jpg`;
      const album:album = {
         src: src,
         caption: caption,
         thumb:''
      };
      this._albums.push(album);
    }
   }

  ngOnInit(): void {
      this.name ="Doctor profile";
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }
}


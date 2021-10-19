import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  authenticated =false;
  constructor() { }

  ngOnInit(): void {

  }

}

import {Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
 @Input() authenticated!:boolean;
  constructor() { }
  ngOnInit(): void {
  }
}

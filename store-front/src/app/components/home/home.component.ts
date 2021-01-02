import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../services/widget.service';


//declare function widget() : any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WidgetService]
})
export class HomeComponent implements OnInit {


  constructor() { }



  ngOnInit() {

  }
}

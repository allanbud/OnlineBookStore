import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../services/widget.service';
import {LocationService} from '../../services/location.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ajaxGetJSON} from 'rxjs/internal-compatibility';


declare function widget() : any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WidgetService]
})
export class HomeComponent implements OnInit {

  public dataFetched = false;

  constructor(public widgetService: WidgetService, public locationService: LocationService) { }




  ngOnInit() {
    this.locationService.getCityName();
    this.dataFetched = this.locationService.dataFetched;
    widget();
  }
}

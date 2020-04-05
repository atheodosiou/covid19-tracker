import { Component, OnInit } from '@angular/core';
import { CovidService } from './shared/services/covid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'covid19';
}

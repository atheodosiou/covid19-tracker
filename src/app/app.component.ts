import { Component, OnInit } from '@angular/core';
import { CovidService } from './shared/services/covid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'covid19';
  constructor(private covidService:CovidService){}
  covidData:any[]=[];
  ngOnInit(){
    this.covidService.getData().subscribe(data=>{
      
      console.log(data);
    },error=>{console.error(error)});
  }
}

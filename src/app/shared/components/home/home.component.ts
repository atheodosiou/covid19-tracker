import { Component, OnInit } from '@angular/core';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private covidService:CovidService) { }
  data:any[];
  ngOnInit() {
    this.covidService.getData().subscribe(res=>{
      this.data=res;
    },error=>{
      console.log(error);
    });
  }

}

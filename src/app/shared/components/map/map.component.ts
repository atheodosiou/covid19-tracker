import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
@Component({
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  constructor() {}
  map: L.Map;
  center:L.LatLng=new L.LatLng(37.2532002, 5.8725402);
  ngOnInit() {
    this.initMap();
    this.getCurrentPosition().then(pos=>{
      console.log(pos)
      this.map.flyTo({lat:pos.coords.latitude,lng:pos.coords.longitude},12);
    }).catch(error=>{
      console.error(error);
      this.map.setView(this.center,3);
    });
  }

  private initMap() {
    const Stadia_AlidadeSmoothDark = L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    );

    const OpenStreetMap_DE = L.tileLayer(
      "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    this.map = L.map("map", {
      center: this.center,
      zoom: 3,
      layers: [Stadia_AlidadeSmoothDark,OpenStreetMap_DE],
    });

    const layers={
      "Light":OpenStreetMap_DE,
      "Dark":Stadia_AlidadeSmoothDark
    };

    L.control.layers(layers).addTo(this.map);
  }

  private getCurrentPosition():Promise<any>{
    return new Promise<any>((fullfiled,rejected)=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success=>{
          fullfiled(success);
        },fail=>{
          rejected(fail);
        });
      }else{
        rejected('Geolocation is not supported by this browser.');
      }
    });
  }
}

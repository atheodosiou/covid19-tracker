import { Component, OnInit, Input } from "@angular/core";
import {map,heatLayer,control,icon,Map,LatLng, tileLayer, marker, layerGroup, Icon} from "leaflet";
import "leaflet.heat/dist/leaflet-heat.js"
import { CovidService } from "../../services/covid.service";


@Component({
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  @Input() set data(value: any[]) {
    if (value) {
      this.mapData = value;
    }
  }

  constructor(private covidService: CovidService) {}
  map: Map;
  private mapData: any[];
  center: LatLng = new LatLng(20.77449,-34.8500967);
  Stadia_AlidadeSmoothDark = tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  );

  OpenStreetMap_DE = tileLayer(
    "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  ngOnInit() {
    this.initMap().then(() => {
      // lat and lng could be null!!
      this.getCurrentPosition()
        .then((pos) => {
          if (pos) {
            this.map.flyTo(
              { lat: pos.coords.latitude, lng: pos.coords.longitude },
              12,
              { animate: true }
            );
          }
        })
        .catch((error) => {});
    });
  }

  private initMap(): Promise<any> {
    return new Promise<any>((fullfiled, rejected) => {
      // Markers
      const markers = [];
      this.mapData.forEach((item) => {
        const mapMarker = marker(
          [item.coordinates.latitude, item.coordinates.longitude],
          {
            icon: this.getIcon(item.stats.confirmed),
          }
        ).bindPopup(
          `<strong>Country/Region: </strong>${item?.country}</br></br><strong>Confirmed: </strong>${item.stats.confirmed}<br><strong>Deaths: </strong>${item.stats.deaths}<br><strong>Recovered: </strong>${item.stats.recovered}</div>`
        ,{autoClose:false, className:'popup'});
        markers.push(mapMarker);
      });
      const markerLayerGroup = layerGroup([...markers]);

      //Total confirmed
      let totalConfirmed=0;
      this.mapData.forEach(x=>{totalConfirmed+=x.stats.confirmed});
      //Heatmap
      const heatData:[number,number,number][] = this.mapData.map((point) => {
        return [
            point.coordinates.latitude,
            point.coordinates.longitude,
            (point.stats.confirmed*100)/totalConfirmed
        ];
      });
      const filterdHeatData:[number,number,number][] = heatData.filter(x=>{
        if(x[0]!==null && x[1]!==null) return true;
        return false
      });
      const heatmapLayer = heatLayer(filterdHeatData as [number,number,number][],{radius:15, blur:25,gradient:{0.015: 'blue', 0.035: 'lime', 0.065: 'red'}})
      //Map
      this.map = map("map", {
        center: this.center,
        zoom: 2,
        minZoom: 1,
        layers: [this.Stadia_AlidadeSmoothDark, markerLayerGroup,heatmapLayer],
      });

      

      const baseMaps = {
        Light: this.OpenStreetMap_DE,
        Grayscale: this.Stadia_AlidadeSmoothDark,
      };
      const overlayMaps = {
        Countries: markerLayerGroup,
        Heatmap:heatmapLayer
      };

      // Add Controls
      control.layers(baseMaps, overlayMaps).addTo(this.map);
      control.scale().addTo(this.map);

      fullfiled();
    });
  }

  private getCurrentPosition(): Promise<any> {
    return new Promise<any>((fullfiled, rejected) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (success) => {
            fullfiled(success);
          },
          (fail) => {
            // rejected(fail);
            fullfiled(null);
          }
        );
      } else {
        rejected("Geolocation is not supported by this browser.");
      }
    });
  }

  private toGeoJson(data: any[]): any[] {
    return data.map((x) => {
      return {
        type: "Feature",
        properties: {
          country: x.country,
          province: x.province,
          stats: x.stats,
          updatedAt: x.updatedAt,
        },
        geometry: {
          type: "Point",
          coordinates: [x.coordinates.latitude, x.coordinates.longitude],
        },
      };
    });
  }

  private getIcon(value: number): Icon {
    if (value <= 9) {
      return icon({
        iconUrl: "../../../../assets/icons/virus.png",
        iconSize: [8, 8],
        iconAnchor: [0, 4],
      });
    } else if (value >= 10 && value <= 99) {
      return icon({
        iconUrl: "../../../../assets/icons/virus.png",
        iconSize: [10, 10],
        iconAnchor: [0, 5],
      });
    } else if (value >= 10 && value <= 99) {
      return icon({
        iconUrl: "../../../../assets/icons/virus.png",
        iconSize: [12, 12],
        iconAnchor: [0, 6],
      });
    } else if (value >= 100 && value <= 999) {
      return icon({
        iconUrl: "../../../../assets/icons/virus.png",
        iconSize: [14, 14],
        iconAnchor: [0, 7],
      });
    } else if (value >= 1000 && value <= 9999) {
      return icon({
        iconUrl: "../../../../assets/icons/virus.png",
        iconSize: [16, 16],
        iconAnchor: [0, 8],
      });
    } else if (value >= 10000) {
      return icon({
        iconUrl: "../../../../assets/icons/virus.png",
        iconSize: [18, 18],
        iconAnchor: [0, 9],
      });
    }
  }
}

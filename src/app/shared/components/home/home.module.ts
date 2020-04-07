import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { MapModule } from '../map/map.module';
import { CountryListModule } from '../country-list/country-list.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent,
      },
    ]),
    MapModule,
    CountryListModule
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent],
})
export class HomeModule {}

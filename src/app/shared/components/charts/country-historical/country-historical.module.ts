import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryHistoricalComponent } from './country-historical.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[CountryHistoricalComponent],
  declarations: [CountryHistoricalComponent]
})
export class CountryHistoricalModule { }

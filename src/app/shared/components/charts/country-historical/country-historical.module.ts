import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryHistoricalComponent } from './country-historical.component';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    ChartsModule
  ],
  exports:[CountryHistoricalComponent],
  declarations: [CountryHistoricalComponent]
})
export class CountryHistoricalModule { }

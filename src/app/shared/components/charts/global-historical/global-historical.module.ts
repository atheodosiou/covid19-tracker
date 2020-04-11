import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalHistoricalComponent } from './global-historical.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports:[GlobalHistoricalComponent],
  declarations: [GlobalHistoricalComponent]
})
export class GlobalHistoricalModule { }

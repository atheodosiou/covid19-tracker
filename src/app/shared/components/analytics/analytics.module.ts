import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { RouterModule } from '@angular/router';
import { GlobalHistoricalModule } from '../charts/global-historical/global-historical.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'',
      component:AnalyticsComponent
    }]),
    GlobalHistoricalModule
  ],
  exports:[AnalyticsComponent],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule { }

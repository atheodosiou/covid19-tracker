import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'',
      component:AnalyticsComponent
    }])
  ],
  exports:[AnalyticsComponent],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule { }

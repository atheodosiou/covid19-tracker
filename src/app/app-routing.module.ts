import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/home'},
  {path:'home',loadChildren:()=>import('./shared/components/home/home.module').then(m=>m.HomeModule)},
  {path:'stats',loadChildren:()=>import('./shared/components/analytics/analytics.module').then(m=>m.AnalyticsModule)},
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

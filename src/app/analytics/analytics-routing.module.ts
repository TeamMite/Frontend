import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { Statement6Component } from './statement6/statement6.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/analytics',
    pathMatch:'full'
  },
  {
    path:'',
    component:AnalyticsComponent,
    children:[
      {
        path:'Statement6',
        component:Statement6Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }

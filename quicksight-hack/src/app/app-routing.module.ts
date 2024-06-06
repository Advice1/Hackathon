import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ManuComponent} from "./manu/manu.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardOneComponent} from "./dashboard-one/dashboard-one.component";


const routes: Routes = [
  {path:'manu', component: ManuComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'FirstDashboard', component: DashboardOneComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

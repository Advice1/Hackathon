import {Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ManuComponent} from "./manu/manu.component";
import {DashboardOneComponent} from "./dashboard-one/dashboard-one.component";

export const routes: Routes = [
  {path:'', redirectTo:'/manu', pathMatch:'full'},
  {path:'manu', component: ManuComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'FirstDashboard', component: DashboardOneComponent}
];


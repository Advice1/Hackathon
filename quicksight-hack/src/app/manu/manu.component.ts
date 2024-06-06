import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-manu',
  standalone: true,
  imports: [DashboardComponent,ManuComponent,RouterOutlet,RouterLink],
  templateUrl: './manu.component.html',
  styleUrl: './manu.component.css'
})
export class ManuComponent {
  constructor(private router:Router) {
  }

  FirstDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
  SecondDashboard() {
    this.router.navigateByUrl('/FirstDashboard').then(r => console.log(r))
  }
  ThirdDashboard() {
    this.router.navigateByUrl('/dashboard').then(r => console.log(r))
  }
  FourthDashboard() {
    this.router.navigateByUrl('/dashboard').then(r => console.log(r))
    alert("Hello World! 1")
  }
}

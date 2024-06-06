import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private route:Router,private formBuilder:FormBuilder) {
  }
  Login=this.formBuilder.group({
    email: ['',[Validators.required,Validators.max(60),Validators.email]],
    password: ['',[Validators.required,Validators.minLength(5)]]
  })

  GetPassword():any{
    return this.Login.get('password');
  }
  GetEmail():any{
    return this.Login.get('email');
  }

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.Login.value, null, 4));
  }
}

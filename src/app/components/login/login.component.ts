import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  loading: boolean = false;
  error: string = '';
  // error: string = '';
  // loading: boolean = false;
  // email: string = '';
  // password: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    // Implement form submission logic here
    console.log('Form submitted');
    // Example: navigate to home page on successful login
    this.router.navigateByUrl('/home');
  }

  redirectToRegister(): void {
    // Implement redirection to register page here
    console.log('Redirect to register page');
    // Example: navigate to register page
    this.router.navigateByUrl('/register');
  }

  guestLogin(): void {
    // Implement guest login logic here
    console.log('Guest login');
  }
}

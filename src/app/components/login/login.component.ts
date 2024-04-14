import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private formBuilder: FormBuilder, private router: Router,   private authService: AuthService) { }

  ngOnInit(): void {
    // Auto-redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  handleSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: error => {
        this.error = error;
        this.loading = false;
      }
    });
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

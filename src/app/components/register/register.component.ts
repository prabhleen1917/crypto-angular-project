import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  error: string = '';
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  handleRegister(): void {
      if (this.registerForm.invalid) {
        return;
      }
  
      const { username, email, password } = this.registerForm.value;
  
      this.loading = true;
      this.authService.register(username, email, password).subscribe({
        next: () => {
          // Navigate to home or other appropriate page on successful registration
          this.router.navigate(['/home']);
        },
        error: err => {
          // Ideally, you'd handle different error cases appropriately
          this.error = err.error.message || 'Failed to register';
          this.loading = false;
        }
      });
    }


  get formControls() {
    return this.registerForm.controls;
  }


}

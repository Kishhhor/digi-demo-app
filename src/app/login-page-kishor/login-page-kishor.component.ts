import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//import {MatInputModule} from '@angular/material/input';
//import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-page-kishor',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule, FormsModule],
  templateUrl: './login-page-kishor.component.html',
  styleUrl: './login-page-kishor.component.css'
})
export class LoginPageKishorComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  // New property to handle forgot password modal visibility
  showForgotPasswordModal = false;
  email: string = '';

  constructor(private router: Router) {} // Inject Router

  submit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      // Check if username is equal to password
      if (username === password) {
        this.router.navigate(['/dashboard']); // Navigate to dashboard
      } else {
        alert('Username and Password must be the same for login.');
      }
    }
  }

  // Function to open the forgot password modal
  openForgotPassword() {
   
    this.showForgotPasswordModal = true;
     }

  // Function to handle the reset password action
  resetPassword() {
    // Handle password reset logic here (e.g., send email)
    alert(`Password reset link sent to ${this.email}`);
    this.showForgotPasswordModal = false; // Close modal after reset
  }

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
}
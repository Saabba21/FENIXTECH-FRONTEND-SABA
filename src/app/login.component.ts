import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './assets/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Credenciales inválidas o la API no devolvió el Token.';
        }
      },
      error: (err) => {
        console.error('Error de autenticación', err);
        this.errorMessage = 'Credenciales inválidas o error en el servidor.';
      }
    });
  }
}
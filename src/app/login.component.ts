import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();
    // TODO: Implementar lógica real con AuthService (POST /auth/login)
    // const fakeJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
    // localStorage.setItem('admin_token', fakeJwtToken);
    
    this.router.navigate(['/dashboard']);
  }
}
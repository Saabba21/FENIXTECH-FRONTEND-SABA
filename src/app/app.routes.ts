import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users.component';
import { CategoriesComponent } from './categories.component';
import { ModerationComponent } from './moderation.component';
import { ProposalsComponent } from './proposals.component';
import { BadgesComponent } from './badges.component';

export const routes: Routes = [
  // Redirigir la ruta raíz al login por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' }, // Carga usuarios por defecto al entrar al dashboard
      { path: 'users', component: UsersComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'moderation', component: ModerationComponent },
      { path: 'proposals', component: ProposalsComponent },
      { path: 'badges', component: BadgesComponent }
    ]
  },
  
  // Si la ruta no existe, enviar al login
  { path: '**', redirectTo: 'login' }
];

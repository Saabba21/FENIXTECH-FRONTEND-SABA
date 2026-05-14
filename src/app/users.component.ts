import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from './assets/admin.service';
import { User } from './assets/interfaces';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  searchQuery: string = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.searchUsers(this.searchQuery).subscribe({
      next: (data: any) => {
        console.log('API Response (Users):', data);
        // Ensure we extract the array if the response is wrapped in an object (e.g., pagination or custom wrapper)
        this.users = Array.isArray(data) ? data : (data?.content || data?.data || data?.users || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  toggleStatus(user: User) {
    if (!user.userId) return;
    this.adminService.updateUserStatus(user.userId, !user.isActive).subscribe({
      next: () => {
        user.isActive = !user.isActive; // Actualizamos la vista
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al actualizar estado', err)
    });
  }
}
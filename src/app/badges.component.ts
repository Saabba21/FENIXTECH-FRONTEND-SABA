import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from './assets/admin.service';
import { CompanyWithBadgesDTO } from './assets/interfaces';

@Component({
  selector: 'app-badges',
  imports: [CommonModule, FormsModule],
  templateUrl: './badges.component.html'
})
export class BadgesComponent implements OnInit {
  companies: CompanyWithBadgesDTO[] = [];
  showAssignForm = false;
  assignForm = { companyId: 0, badgeId: 0 };
  errorMessage = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.adminService.getCompaniesWithBadges().subscribe((res: any) => {
      this.companies = Array.isArray(res) ? res : (res?.content || res?.data || res?.companies || []);
      this.cdr.detectChanges();
    });
  }

  openAssignForm() {
    this.showAssignForm = true;
    this.errorMessage = '';
    this.assignForm = { 
      companyId: this.companies.length > 0 ? (this.companies[0].companyId || 0) : 0, 
      badgeId: 0 
    };
  }

  cancelAssign() {
    this.showAssignForm = false;
    this.errorMessage = '';
  }

  submitAssign() {
    this.errorMessage = '';
    if (!this.assignForm.companyId || !this.assignForm.badgeId) {
      this.errorMessage = 'Por favor, selecciona una empresa y proporciona un ID de insignia válido.';
      this.cdr.detectChanges();
      return;
    }
    
    this.adminService.assignBadge(Number(this.assignForm.companyId), Number(this.assignForm.badgeId)).subscribe({
      next: () => {
        this.loadCompanies();
        this.showAssignForm = false;
      },
      error: err => {
        console.error('Error assigning badge', err);
        this.errorMessage = 'Ocurrió un error al asignar la insignia. Verifica que el ID de la insignia exista y que no esté ya asignada a esta empresa.';
        this.cdr.detectChanges();
      }
    });
  }

  revokeBadge(companyId?: number, badgeId?: number) {
    if (!companyId || !badgeId || !confirm('¿Revocar esta insignia?')) return;
    this.adminService.revokeBadge(companyId, badgeId).subscribe(() => this.loadCompanies());
  }
}
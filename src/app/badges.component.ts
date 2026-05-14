import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from './assets/admin.service';
import { CompanyWithBadgesDTO } from './assets/interfaces';

@Component({
  selector: 'app-badges',
  imports: [CommonModule],
  templateUrl: './badges.component.html'
})
export class BadgesComponent implements OnInit {
  companies: CompanyWithBadgesDTO[] = [];

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

  revokeBadge(companyId?: number, badgeId?: number) {
    if (!companyId || !badgeId || !confirm('¿Revocar esta insignia?')) return;
    this.adminService.revokeBadge(companyId, badgeId).subscribe(() => this.loadCompanies());
  }
}
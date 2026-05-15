import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from './assets/admin.service';
import { Proposal } from './assets/interfaces';

@Component({
  selector: 'app-proposals',
  imports: [CommonModule, FormsModule],
  templateUrl: './proposals.component.html'
})
export class ProposalsComponent implements OnInit {
  proposals: Proposal[] = [];
  editingId: number | null = null;
  editStatus: 'OPEN' | 'FULFILLED' = 'OPEN';
  errorMessage = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.adminService.getProposals().subscribe((res: any) => {
      this.proposals = Array.isArray(res) ? res : (res?.content || res?.data || res?.proposals || []);
      this.cdr.detectChanges();
    });
  }

  startEdit(proposal: Proposal) {
    this.editingId = proposal.proposalId || null;
    this.editStatus = proposal.status;
    this.errorMessage = '';
  }

  cancelEdit() {
    this.editingId = null;
    this.errorMessage = '';
  }

  confirmEdit(proposal: Proposal) {
    if (!proposal.proposalId) return;
    this.errorMessage = '';
    this.adminService.updateProposalStatus(proposal.proposalId, this.editStatus).subscribe({
      next: () => {
        proposal.status = this.editStatus;
        this.editingId = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating proposal status', err);
        // Fallback: If it's a parsing error but it actually succeeded
        if (err.status === 200) {
          proposal.status = this.editStatus;
          this.editingId = null;
          this.cdr.detectChanges();
        } else {
          this.errorMessage = 'Error al actualizar la propuesta. Revisa la consola.';
          this.cdr.detectChanges();
        }
      }
    });
  }

  deleteProposal(id?: number) {
    if (!id || !confirm('¿Eliminar esta solicitud de forma definitiva?')) return;
    this.adminService.deleteProposal(id).subscribe(() => {
      this.proposals = this.proposals.filter(p => p.proposalId !== id);
      this.cdr.detectChanges();
    });
  }
}
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
  }

  cancelEdit() {
    this.editingId = null;
  }

  confirmEdit(proposal: Proposal) {
    if (!proposal.proposalId) return;
    this.adminService.updateProposalStatus(proposal.proposalId, this.editStatus).subscribe(() => {
      proposal.status = this.editStatus;
      this.editingId = null;
    });
  }

  deleteProposal(id?: number) {
    if (!id || !confirm('¿Eliminar esta solicitud de forma definitiva?')) return;
    this.adminService.deleteProposal(id).subscribe(() => {
      this.proposals = this.proposals.filter(p => p.proposalId !== id);
    });
  }
}
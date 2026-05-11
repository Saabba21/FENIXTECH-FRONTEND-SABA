import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-state-handler',
  standalone: true,
  template: `
    @if (loading) {
      <div class="container py-5 mt-5 text-center" style="min-height: 50vh;">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-3 text-muted">Cargando datos...</p>
      </div>
    } @else if (error) {
      <div class="container py-5 mt-5 text-center text-danger">
        <i class="bi bi-exclamation-triangle-fill" style="font-size: 3rem;"></i>
        <h4 class="mt-3">¡Vaya! Algo ha salido mal</h4>
        <p>{{ error }}</p>
      </div>
    } @else {
      <ng-content></ng-content>
    }
  `
})
export class StateHandlerComponent {
  @Input() loading = false;
  @Input() error: string | null = null;
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
      <div class="d-flex flex-wrap gap-2">
        <select class="form-select form-select-sm rounded-pill w-auto" 
                [ngModel]="priceFilter" (ngModelChange)="priceFilterChange.emit($event)">
          <option value="">Precio</option>
          <option value="free">Gratis</option>
          <option value="under_100">Menos de 100€</option>
        </select>
        <button (click)="resetAll()" class="btn btn-sm btn-outline-danger rounded-pill">
          Limpiar
        </button>
      </div>
    </div>
  `
})
export class FilterBarComponent {
  @Input() priceFilter = '';
  @Output() priceFilterChange = new EventEmitter<string>();
  
  resetAll() {
    this.priceFilterChange.emit('');
    // Emitir reset para el resto...
  }
}
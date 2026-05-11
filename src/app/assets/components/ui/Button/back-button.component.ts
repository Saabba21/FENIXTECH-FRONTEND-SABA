import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a (click)="handleNavigate($event)"
       [routerLink]="to !== -1 ? to : null"
       class="btn btn-light rounded-circle icon-circle-sm shadow-sm {{ className }}"
       [attr.aria-label]="ariaLabel">
      <i class="bi bi-arrow-left fs-5"></i>
    </a>
  `
})
export class BackButtonComponent {
  @Input() to: any = -1;
  @Input() className = '';
  @Input() ariaLabel = 'Volver';

  constructor(private location: Location) {}

  handleNavigate(event: Event) {
    if (this.to === -1) {
      event.preventDefault();
      this.location.back();
    }
  }
}
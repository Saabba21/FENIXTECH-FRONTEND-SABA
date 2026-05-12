import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from './assets/admin.service';
import { Category, Subcategory } from './assets/interfaces';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.adminService.getCategories().subscribe({
      next: (res) => this.categories = res || [],
      error: (err) => console.error('Error al cargar categorías', err)
    });
    this.adminService.getSubcategories().subscribe({
      next: (res) => this.subcategories = res || [],
      error: (err) => console.error('Error al cargar subcategorías', err)
    });
  }

  deleteCategory(id?: number) {
    if (!id || !confirm('¿Eliminar esta categoría de forma permanente?')) return;
    this.adminService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(c => c.categoryId !== id);
    });
  }

  deleteSubcategory(id?: number) {
    if (!id || !confirm('¿Eliminar esta subcategoría de forma permanente?')) return;
    this.adminService.deleteSubcategory(id).subscribe(() => {
      this.subcategories = this.subcategories.filter(s => s.subcategoryId !== id);
    });
  }
}
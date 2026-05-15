import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from './assets/admin.service';
import { Category, Subcategory } from './assets/interfaces';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[] = [];

  showCategoryForm = false;
  showSubcategoryForm = false;
  editingCategoryId: number | null = null;
  editingSubcategoryId: number | null = null;

  categoryForm = { name: '', description: '' };
  subcategoryForm = { name: '', description: '', categoryId: 0 };

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.adminService.getCategories().subscribe({
      next: (res: any) => {
        console.log('API Response (Categories):', res);
        this.categories = Array.isArray(res) ? res : (res?.content || res?.data || res?.categories || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar categorías', err)
    });
    this.adminService.getSubcategories().subscribe({
      next: (res: any) => {
        console.log('API Response (Subcategories):', res);
        this.subcategories = Array.isArray(res) ? res : (res?.content || res?.data || res?.subcategories || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar subcategorías', err)
    });
  }

  // --- CATEGORY ---
  openAddCategory() {
    this.showCategoryForm = true;
    this.editingCategoryId = null;
    this.categoryForm = { name: '', description: '' };
  }

  openEditCategory(cat: Category) {
    this.showCategoryForm = true;
    this.editingCategoryId = cat.categoryId || null;
    this.categoryForm = { name: cat.name, description: cat.description || '' };
  }

  cancelCategoryForm() {
    this.showCategoryForm = false;
    this.editingCategoryId = null;
  }

  saveCategory() {
    if (this.editingCategoryId) {
      this.adminService.updateCategory(this.editingCategoryId, this.categoryForm as any).subscribe({
        next: () => {
          this.loadData();
          this.cancelCategoryForm();
        },
        error: err => console.error('Error updating category', err)
      });
    } else {
      this.adminService.createCategory(this.categoryForm as any).subscribe({
        next: () => {
          this.loadData();
          this.cancelCategoryForm();
        },
        error: err => console.error('Error creating category', err)
      });
    }
  }

  deleteCategory(id?: number) {
    if (!id || !confirm('¿Eliminar esta categoría de forma permanente?')) return;
    this.adminService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(c => c.categoryId !== id);
      this.cdr.detectChanges();
    });
  }

  // --- SUBCATEGORY ---
  openAddSubcategory() {
    this.showSubcategoryForm = true;
    this.editingSubcategoryId = null;
    this.subcategoryForm = { name: '', description: '', categoryId: this.categories.length > 0 ? (this.categories[0].categoryId || 0) : 0 };
  }

  openEditSubcategory(sub: Subcategory) {
    this.showSubcategoryForm = true;
    this.editingSubcategoryId = sub.subcategoryId || null;
    // @ts-ignore
    this.subcategoryForm = { name: sub.name, description: sub.description || '', categoryId: sub.category?.categoryId || sub['categoryId'] || 0 };
  }

  cancelSubcategoryForm() {
    this.showSubcategoryForm = false;
    this.editingSubcategoryId = null;
  }

  saveSubcategory() {
    const payload = {
      name: this.subcategoryForm.name,
      description: this.subcategoryForm.description,
      categoryId: Number(this.subcategoryForm.categoryId)
    };

    if (this.editingSubcategoryId) {
      this.adminService.updateSubcategory(this.editingSubcategoryId, payload).subscribe({
        next: () => {
          this.loadData();
          this.cancelSubcategoryForm();
        },
        error: err => console.error('Error updating subcategory', err)
      });
    } else {
      this.adminService.createSubcategory(payload).subscribe({
        next: () => {
          this.loadData();
          this.cancelSubcategoryForm();
        },
        error: err => console.error('Error creating subcategory', err)
      });
    }
  }

  deleteSubcategory(id?: number) {
    if (!id || !confirm('¿Eliminar esta subcategoría de forma permanente?')) return;
    this.adminService.deleteSubcategory(id).subscribe(() => {
      this.subcategories = this.subcategories.filter(s => s.subcategoryId !== id);
      this.cdr.detectChanges();
    });
  }
}
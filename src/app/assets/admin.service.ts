import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Category, Subcategory, Product, Post, Comment, Proposal, CompanyWithBadgesDTO } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Ajusta el puerto si tu API local o Nginx expone otro distinto a /fenixtech
  private readonly API_URL = 'http://localhost/fenixtech/api/v1';

  constructor(private http: HttpClient) {}

  // --- GESTIÓN DE USUARIOS ---
  searchUsers(query: string = ''): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/admin/users/search?query=${query}`);
  }

  updateUserStatus(id: number, active: boolean): Observable<any> {
    return this.http.put(`${this.API_URL}/admin/users/${id}/status`, active, { headers: {'Content-Type': 'application/json'} });
  }

  // --- GESTIÓN DE CATEGORÍAS ---
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API_URL}/admin/content/categories`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.API_URL}/admin/content/categories`, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.API_URL}/admin/content/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/content/categories/${id}`);
  }

  // --- GESTIÓN DE SUBCATEGORÍAS ---
  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.API_URL}/admin/content/subcategories`);
  }

  createSubcategory(subcategory: any): Observable<Subcategory> {
    return this.http.post<Subcategory>(`${this.API_URL}/admin/content/subcategories`, subcategory);
  }

  updateSubcategory(id: number, subcategory: any): Observable<Subcategory> {
    return this.http.put<Subcategory>(`${this.API_URL}/admin/content/subcategories/${id}`, subcategory);
  }

  deleteSubcategory(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/content/subcategories/${id}`);
  }

  // --- CENTRO DE MODERACIÓN ---
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/admin/content/products`);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/content/products/${id}`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/admin/content/posts`);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/content/posts/${id}`);
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/admin/content/comments`);
  }
  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/content/comments/${id}`);
  }

  // --- GESTIÓN DE PROPUESTAS (MODERACIÓN) ---
  getProposals(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.API_URL}/admin/proposals/all`);
  }

  updateProposalStatus(id: number, status: 'OPEN' | 'FULFILLED'): Observable<any> {
    return this.http.put(`${this.API_URL}/admin/proposals/${id}`, `"${status}"`, { headers: {'Content-Type': 'application/json'} });
  }

  deleteProposal(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/proposals/${id}`);
  }

  // --- INSIGNIAS CORPORATIVAS (BADGES) ---
  getCompaniesWithBadges(): Observable<CompanyWithBadgesDTO[]> {
    return this.http.get<CompanyWithBadgesDTO[]>(`${this.API_URL}/admin/companies/badges`);
  }

  assignBadge(companyId: number, badgeId: number): Observable<any> {
    return this.http.post(`${this.API_URL}/admin/companies/company-badges`, { companyId, badgeId });
  }

  revokeBadge(companyId: number, badgeId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/companies/company-badges/company/${companyId}/badge/${badgeId}`);
  }
}
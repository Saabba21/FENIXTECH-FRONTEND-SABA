import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from './assets/admin.service';
import { Product, Post, Comment } from './assets/interfaces';

@Component({
  selector: 'app-moderation',
  imports: [CommonModule],
  templateUrl: './moderation.component.html'
})
export class ModerationComponent implements OnInit {
  products: Product[] = [];
  posts: Post[] = [];
  comments: Comment[] = [];

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.adminService.getProducts().subscribe((res: any) => {
      this.products = Array.isArray(res) ? res : (res?.content || res?.data || res?.products || []);
      this.cdr.detectChanges();
    });
    this.adminService.getPosts().subscribe((res: any) => {
      this.posts = Array.isArray(res) ? res : (res?.content || res?.data || res?.posts || []);
      this.cdr.detectChanges();
    });
    this.adminService.getComments().subscribe((res: any) => {
      this.comments = Array.isArray(res) ? res : (res?.content || res?.data || res?.comments || []);
      this.cdr.detectChanges();
    });
  }

  deleteProduct(id?: number) {
    if (!id || !confirm('¿Eliminar este producto?')) return;
    this.adminService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p.productId !== id);
    });
  }

  deletePost(id?: number) {
    if (!id || !confirm('¿Eliminar este post del foro?')) return;
    this.adminService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(p => p.postId !== id);
    });
  }

  deleteComment(id?: number) {
    if (!id || !confirm('¿Eliminar este comentario?')) return;
    this.adminService.deleteComment(id).subscribe(() => {
      this.comments = this.comments.filter(c => c.commentId !== id);
    });
  }
}
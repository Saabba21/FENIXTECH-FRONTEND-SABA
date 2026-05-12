export interface User {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role?: string;
}

export interface Category {
  categoryId?: number;
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface Subcategory {
  subcategoryId?: number;
  name: string;
  description?: string;
  isActive?: boolean;
  category?: Category;
}

export interface Product {
  productId?: number;
  productTitle: string;
  company?: { companyName: string };
}

export interface Post {
  postId?: number;
  title: string;
  author?: { firstName: string };
}

export interface Comment {
  commentId?: number;
  body: string;
  author?: { firstName: string };
  post?: { title: string };
}

export interface Proposal {
  proposalId?: number;
  title: string;
  requester?: { firstName: string };
  status: 'OPEN' | 'FULFILLED';
}

export interface Badge {
  badgeId?: number;
  name?: string;
}

export interface CompanyWithBadgesDTO {
  companyId?: number;
  companyName: string;
  badges: Badge[];
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
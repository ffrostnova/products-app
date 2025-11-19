export interface Product {
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type FilterType = 'all' | 'favorites';

export interface ProductsState {
  products: Product[];
  favorites: Set<number | string>;
  filter: FilterType;
  searchQuery: string;
  categoryFilter: string;
  currentPage: number;
  itemsPerPage: number;
  loading: boolean;
  error: string | null;
}


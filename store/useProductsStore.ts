import { create } from 'zustand';
import { Product, ProductsState, FilterType, ProductFormData } from '@/types/product';
import axios from 'axios';

interface ProductsStore extends ProductsState {
  // Actions
  fetchProducts: () => Promise<void>;
  toggleFavorite: (id: number | string) => void;
  deleteProduct: (id: number | string) => void;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setCurrentPage: (page: number) => void;
  addProduct: (product: ProductFormData) => void;
  updateProduct: (id: number | string, product: ProductFormData) => void;
  getFilteredProducts: () => Product[];
  getPaginatedProducts: () => Product[];
  getTotalPages: () => number;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  // Initial state
  products: [],
  favorites: new Set(),
  filter: 'all',
  searchQuery: '',
  categoryFilter: '',
  currentPage: 1,
  itemsPerPage: 12,
  loading: false,
  error: null,

  // Fetch products from API
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch products',
        loading: false 
      });
    }
  },

  // Toggle favorite
  toggleFavorite: (id) => {
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return { favorites: newFavorites };
    });
  },

  // Delete product
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
      favorites: new Set([...state.favorites].filter((fid) => fid !== id)),
    }));
  },

  // Set filter
  setFilter: (filter) => {
    set({ filter, currentPage: 1 });
  },

  // Set search query
  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
  },

  // Set category filter
  setCategoryFilter: (category) => {
    set({ categoryFilter: category, currentPage: 1 });
  },

  // Set current page
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  // Add new product
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      rating: { rate: 0, count: 0 },
    };
    set((state) => ({
      products: [newProduct, ...state.products],
    }));
  },

  // Update product
  updateProduct: (id, productData) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...productData } : p
      ),
    }));
  },

  // Get filtered products
  getFilteredProducts: () => {
    const { products, filter, favorites, searchQuery, categoryFilter } = get();
    
    let filtered = products;

    // Filter by favorites
    if (filter === 'favorites') {
      filtered = filtered.filter((p) => favorites.has(p.id));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    return filtered;
  },

  // Get paginated products
  getPaginatedProducts: () => {
    const filtered = get().getFilteredProducts();
    const { currentPage, itemsPerPage } = get();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  },

  // Get total pages
  getTotalPages: () => {
    const filtered = get().getFilteredProducts();
    const { itemsPerPage } = get();
    return Math.ceil(filtered.length / itemsPerPage);
  },
}));


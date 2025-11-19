'use client';

import ProductGrid from '@/components/ProductGrid';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Продукты</h1>
            <Link
              href="/create-product"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Создать продукт
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-8">
        <SearchBar />
        <FilterBar />
        <ProductGrid />
        <Pagination />
      </main>
    </div>
  );
}


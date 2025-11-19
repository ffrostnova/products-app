'use client';

import { useProductsStore } from '@/store/useProductsStore';

export default function FilterBar() {
  const {
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    products,
    getFilteredProducts,
    favorites,
  } = useProductsStore();

  // Получаем уникальные категории
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).sort();

  const filteredProducts = getFilteredProducts();

  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Все ({products.length})
        </button>
        <button
          onClick={() => setFilter('favorites')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'favorites'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Избранное ({favorites.size})
        </button>
      </div>

      <div className="flex-1 w-full md:w-auto">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Все категории</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-600">
        Найдено: {filteredProducts.length}
      </div>
    </div>
  );
}


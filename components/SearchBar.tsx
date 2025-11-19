'use client';

import { useProductsStore } from '@/store/useProductsStore';
import { useState } from 'react';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useProductsStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    setSearchQuery(value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Поиск по названию, описанию или категории..."
        value={localQuery}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}


'use client';

import { Product } from '@/types/product';
import { useProductsStore } from '@/store/useProductsStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { toggleFavorite, deleteProduct, favorites } = useProductsStore();
  const isFavorite = favorites.has(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.action-button')) {
      router.push(`/products/${product.id}`);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
      deleteProduct(product.id);
    }
  };

  const truncatedDescription =
    product.description.length > 100
      ? product.description.substring(0, 100) + '...'
      : product.description;

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative w-full h-64 bg-gray-200">
        <Image
          src={product.image || 'https://via.placeholder.com/400x400?text=No+Image'}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
            {product.title}
          </h3>
          <div className="flex gap-2 ml-2">
            <button
              onClick={handleLike}
              className={`action-button p-2 rounded-full transition-colors ${
                isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
              }`}
              aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            >
              <svg
                className="w-5 h-5"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="action-button p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Удалить продукт"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-3">
          {truncatedDescription}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
}


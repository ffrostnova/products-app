'use client';

import { useProductsStore } from '@/store/useProductsStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, fetchProducts, toggleFavorite, favorites, deleteProduct } =
    useProductsStore();
  const productId = params.id as string;

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const product = products.find(
    (p) => p.id.toString() === productId.toString()
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Продукт не найден
          </h2>
          <Link
            href="/products"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.has(product.id);

  const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
      deleteProduct(product.id);
      router.push('/products');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← Вернуться к списку
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-96 md:h-auto bg-gray-200">
              <Image
                src={product.image || 'https://via.placeholder.com/400x400?text=No+Image'}
                alt={product.title}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.title}
                </h1>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                  aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                >
                  <svg
                    className="w-6 h-6"
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
              </div>

              <div className="mb-4">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-blue-600 mb-2">
                  ${product.price}
                </p>
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">
                      {'★'.repeat(Math.floor(product.rating.rate))}
                    </span>
                    <span className="text-gray-600">
                      {product.rating.rate} ({product.rating.count} отзывов)
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Описание
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Редактировать
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


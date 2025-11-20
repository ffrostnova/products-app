import ProductDetailClient from './ProductDetailClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      return [];
    }
    
    const products = await response.json();
    
    if (!Array.isArray(products)) {
      return [];
    }
    
    return products.map((product: { id: number | string }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}

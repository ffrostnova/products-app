import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    return products.map((product: { id: number | string }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    return [];
  }
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}

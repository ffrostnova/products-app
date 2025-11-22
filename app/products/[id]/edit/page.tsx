import EditProductClient from './EditProductClient';

export async function generateStaticParams() {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      cache: 'force-cache',
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
    return [];
  }
}

export default function EditProductPage() {
  return <EditProductClient />;
}

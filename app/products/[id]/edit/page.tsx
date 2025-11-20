import EditProductClient from './EditProductClient';

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

export default function EditProductPage() {
  return <EditProductClient />;
}

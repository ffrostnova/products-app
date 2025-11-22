import EditProductClient from './EditProductClient';
import axios from 'axios';

export async function generateStaticParams() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;
    
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

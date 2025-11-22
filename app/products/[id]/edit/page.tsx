import EditProductClient from './EditProductClient';

export function generateStaticParams() {
  // Генерируем статические параметры для первых 20 продуктов
  // (Fake Store API обычно возвращает около 20 продуктов)
  const ids = Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
  
  return ids;
}

export default function EditProductPage() {
  return <EditProductClient />;
}

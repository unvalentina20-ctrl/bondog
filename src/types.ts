export interface Product {
  id: string;
  name: string;
  category: 'perro' | 'gato' | 'superfood' | 'snack' | 'cuidado';
  price: number;
  weight: string;
  image: string;
  badge?: string;
  description: string;
  ingredients: string[];
  nutritionalValue: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  petType: 'perro' | 'gato';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export function formatARS(amount: number): string {
  return `$${Math.round(amount).toLocaleString('es-AR')}`;
}

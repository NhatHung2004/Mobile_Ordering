import { Coffee, Flame, IceCream, Utensils } from 'lucide-react';
import type { MenuItem } from '../types';

export const CATEGORIES = [
  { name: 'Tất cả', key: 'All', icon: <Utensils size={18} /> },
  { name: 'Nổi bật', key: 'Popular', icon: <Flame size={18} /> },
  { name: 'Đồ ăn', key: 'Food', icon: <Utensils size={18} /> },
  { name: 'Đồ uống', key: 'Drinks', icon: <Coffee size={18} /> },
  { name: 'Tráng miệng', key: 'Desserts', icon: <IceCream size={18} /> },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Mushroom Burger',
    description:
      'Juicy wagyu beef patty topped with melted gruyere, caramelized onions, and our signature black truffle mayo on a toasted brioche bun.',
    price: 16.99,
    category: 'Food',
    popular: true,
    rating: 4.9,
    calories: 850,
    time: '10-15 min',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Spicy Margherita Pizza',
    description:
      'Wood-fired crust, San Marzano tomato sauce, fresh mozzarella, basil, and a drizzle of hot honey.',
    price: 14.5,
    category: 'Food',
    popular: true,
    rating: 4.7,
    calories: 920,
    time: '15-20 min',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'Crispy Calamari',
    description:
      'Lightly dusted and fried to golden perfection. Served with house-made marinara and lemon wedges.',
    price: 11.0,
    category: 'Food',
    popular: false,
    rating: 4.5,
    calories: 450,
    time: '8-10 min',
    image:
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Artisan Iced Latte',
    description:
      'Double shot of our house espresso blend served over ice with creamy oat milk and a touch of vanilla bean syrup.',
    price: 5.5,
    category: 'Drinks',
    popular: true,
    rating: 4.8,
    calories: 120,
    time: '3-5 min',
    image:
      'https://images.unsplash.com/photo-1461023058943-0708e5bb599b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    name: 'Fresh Mango Smoothie',
    description: 'Blended ripe mangoes, Greek yogurt, and a hint of honey. Refreshing and healthy.',
    price: 6.5,
    category: 'Drinks',
    popular: false,
    rating: 4.6,
    calories: 210,
    time: '5 min',
    image:
      'https://images.unsplash.com/photo-1546890975-7596e98cdbf1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    name: 'Matcha Mille Crepe',
    description:
      '20 layers of delicate green tea crepes filled with light, sweet matcha pastry cream.',
    price: 8.99,
    category: 'Desserts',
    popular: true,
    rating: 4.9,
    calories: 380,
    time: 'Ready',
    image:
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '7',
    name: 'Classic Tiramisu',
    description:
      'Espresso-soaked ladyfingers layered with rich mascarpone cream and dusted with premium cocoa powder.',
    price: 7.5,
    category: 'Desserts',
    popular: false,
    rating: 4.7,
    calories: 410,
    time: 'Ready',
    image:
      'https://images.unsplash.com/photo-1571115177098-24c42de1bd15?auto=format&fit=crop&w=600&q=80',
  },
];

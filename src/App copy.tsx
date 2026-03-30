import { useState } from 'react';
import {
  Search,
  ShoppingCart,
  History,
  ChevronLeft,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Clock,
  Star,
  Utensils,
  Coffee,
  IceCream,
  Flame,
  X,
} from 'lucide-react';

// --- MOCK DATA ---
const MENU_ITEMS = [
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
    soldOut: true,
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

const CATEGORIES = [
  { name: 'All', icon: <Utensils size={18} /> },
  { name: 'Popular', icon: <Flame size={18} /> },
  { name: 'Food', icon: <Utensils size={18} /> },
  { name: 'Drinks', icon: <Coffee size={18} /> },
  { name: 'Desserts', icon: <IceCream size={18} /> },
];

export default function App() {
  // --- STATE ---
  const [currentScreen, setCurrentScreen] = useState('home'); // home, detail, cart, history, confirmation
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [detailQty, setDetailQty] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // --- HELPER FUNCTIONS ---
  const showToast = (message: any, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const navigateTo = (screen: any, payload: any = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (screen === 'detail') {
      setSelectedItem(payload);
      setDetailQty(1);
    } else if (screen === 'order-detail') {
      setSelectedOrder(payload);
    }
    setCurrentScreen(screen);
  };

  const addToCart = (item: any, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { ...item, quantity }];
    });
    showToast(`Added ${quantity} ${item.name} to order`);
    navigateTo('home');
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from order', 'error');
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      total: total,
      timestamp: new Date(),
      status: 'Preparing',
    };

    setOrderHistory((prev) => [newOrder, ...prev]);
    setCart([]);
    navigateTo('confirmation');
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- RENDER COMPONENTS ---

  const renderHome = () => {
    let filteredMenu = MENU_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (activeCategory === 'Popular') {
      filteredMenu = filteredMenu.filter((item) => item.popular);
    } else if (activeCategory !== 'All') {
      filteredMenu = filteredMenu.filter((item) => item.category === activeCategory);
    }

    const popularItems = MENU_ITEMS.filter((item) => item.popular);

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 pb-24 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-5 pt-8 pb-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-stone-500">Welcome to Table 12</p>
              <h1 className="text-2xl font-bold text-stone-800">Hungry? 🍔</h1>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 shadow-sm">
              T12
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 transform text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search dishes, drinks..."
              className="w-full rounded-2xl bg-stone-100 py-3 pr-4 pl-10 text-stone-800 transition-all outline-none focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="hide-scrollbar flex gap-3 overflow-x-auto px-5 py-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap shadow-sm transition-all ${
                activeCategory === cat.name
                  ? 'bg-orange-500 text-white'
                  : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Popular Section (Only show if no search and 'All' or 'Popular' selected) */}
        {!searchQuery && (activeCategory === 'All' || activeCategory === 'Popular') && (
          <div className="mb-8 px-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-stone-800">
              Popular Right Now <Flame size={20} className="text-orange-500" />
            </h2>
            <div className="hide-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-4">
              {popularItems.map((item) => (
                <div
                  key={`pop-${item.id}`}
                  onClick={() => !item.soldOut && navigateTo('detail', item)}
                  className={`relative min-w-60 rounded-3xl border border-stone-100 bg-white p-3 shadow-sm transition-transform ${item.soldOut ? 'opacity-70 grayscale-[0.5]' : 'cursor-pointer active:scale-95'}`}
                >
                  <div className="relative mb-3 h-36 overflow-hidden rounded-2xl">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-stone-800 backdrop-blur-sm">
                      <Star size={12} className="fill-orange-400 text-orange-400" /> {item.rating}
                    </div>
                    {item.soldOut && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                        <span className="rounded-full bg-stone-800 px-3 py-1.5 text-sm font-bold text-white">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="truncate font-bold text-stone-800">{item.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-orange-600">${item.price.toFixed(2)}</span>
                    <button
                      className={`rounded-xl p-2 ${item.soldOut ? 'bg-stone-100 text-stone-400' : 'bg-orange-100 text-orange-600'}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu List */}
        <div className="px-5">
          <h2 className="mb-4 text-lg font-bold text-stone-800">
            {searchQuery
              ? 'Search Results'
              : activeCategory === 'All'
                ? 'Full Menu'
                : activeCategory}
          </h2>
          <div className="flex flex-col gap-4">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <div
                  key={`list-${item.id}`}
                  onClick={() => !item.soldOut && navigateTo('detail', item)}
                  className={`relative flex gap-4 overflow-hidden rounded-3xl border border-stone-100 bg-white p-3 shadow-sm transition-transform ${item.soldOut ? 'opacity-70 grayscale-[0.5]' : 'cursor-pointer active:scale-[0.98]'}`}
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    {item.soldOut && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[2px]"></div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <div className="mb-1 flex items-start justify-between">
                      <h3 className="leading-tight font-bold text-stone-800">{item.name}</h3>
                    </div>
                    <p className="mb-2 line-clamp-2 text-xs text-stone-500">{item.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      {item.soldOut ? (
                        <span className="text-sm font-bold text-red-500">Sold Out</span>
                      ) : (
                        <span className="font-bold text-orange-600">${item.price.toFixed(2)}</span>
                      )}
                      <div className="flex items-center gap-1 rounded-lg bg-stone-100 px-2 py-1 text-xs font-medium text-stone-500">
                        <Star size={12} className="fill-orange-400 text-orange-400" /> {item.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-stone-500">
                <Search size={40} className="mx-auto mb-3 text-stone-300" />
                <p>No items found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    if (!selectedItem) return null;

    return (
      <div className="animate-in slide-in-from-right min-h-screen bg-stone-50 pb-24 duration-300">
        <div className="relative h-72 w-full">
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="h-full w-full object-cover"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-stone-50"></div>

          <button
            onClick={() => navigateTo('home')}
            className="absolute top-6 left-5 rounded-full bg-white/30 p-2.5 text-white backdrop-blur-md transition hover:bg-white/40"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="relative z-10 -mt-6 px-5">
          <div className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <h1 className="w-3/4 text-2xl font-bold text-stone-800">{selectedItem.name}</h1>
              <div className="rounded-xl bg-orange-100 px-3 py-1.5 text-lg font-bold text-orange-600">
                ${selectedItem.price.toFixed(2)}
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 rounded-lg border border-stone-100 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-600">
                <Star size={16} className="fill-orange-400 text-orange-400" />
                {selectedItem.rating}
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-stone-100 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-600">
                <Clock size={16} className="text-stone-400" />
                {selectedItem.time}
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-stone-100 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-600">
                <Flame size={16} className="text-stone-400" />
                {selectedItem.calories} kcal
              </div>
            </div>

            <h3 className="mb-2 font-bold text-stone-800">Details</h3>
            <p className="mb-8 text-sm leading-relaxed text-stone-500">
              {selectedItem.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between rounded-2xl border border-stone-100 bg-stone-50 p-2">
              <span className="px-4 font-semibold text-stone-700">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDetailQty(Math.max(1, detailQty - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-stone-600 shadow-sm transition-transform active:scale-90"
                >
                  <Minus size={20} />
                </button>
                <span className="w-4 text-center text-lg font-bold text-stone-800">
                  {detailQty}
                </span>
                <button
                  onClick={() => setDetailQty(detailQty + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm transition-transform active:scale-90"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-stone-100 bg-white p-5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] md:mx-auto md:max-w-md">
          <button
            onClick={() => addToCart(selectedItem, detailQty)}
            className="flex w-full items-center justify-between rounded-2xl bg-orange-500 px-6 py-4 text-lg font-bold text-white transition-transform active:scale-[0.98]"
          >
            <span>Add to Order</span>
            <span>${(selectedItem.price * detailQty).toFixed(2)}</span>
          </button>
        </div>
      </div>
    );
  };

  const renderCart = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    return (
      <div className="animate-in fade-in min-h-screen bg-stone-50 pb-32 duration-300">
        <div className="sticky top-0 z-10 border-b border-stone-100 bg-white px-5 pt-8 pb-4 shadow-sm">
          <h1 className="text-center text-2xl font-bold text-stone-800">Your Order</h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex h-[60vh] flex-col items-center justify-center px-5 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-orange-400">
              <ShoppingCart size={40} />
            </div>
            <h2 className="mb-2 text-xl font-bold text-stone-800">Cart is empty</h2>
            <p className="mb-8 text-stone-500">
              Looks like you haven't added anything to your order yet.
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="rounded-full bg-orange-500 px-8 py-3 font-bold text-white shadow-sm"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="mt-6 px-5">
            <div className="mb-8 flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={`cart-${item.id}`}
                  className="flex gap-4 rounded-3xl border border-stone-100 bg-white p-3 shadow-sm"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col py-1">
                    <div className="flex items-start justify-between">
                      <h3 className="pr-4 leading-tight font-bold text-stone-800">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-stone-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <span className="mt-1 text-sm font-bold text-orange-600">
                      ${item.price.toFixed(2)}
                    </span>

                    <div className="mt-auto flex w-max items-center gap-3 rounded-xl border border-stone-100 bg-stone-50 p-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-stone-600 shadow-sm"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center text-sm font-bold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mb-6 rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-stone-800">Order Summary</h3>
              <div className="mb-3 flex justify-between text-sm text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="mb-4 flex justify-between border-b border-stone-100 pb-4 text-sm text-stone-600">
                <span>Tax (8%)</span>
                <span className="font-medium text-stone-800">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-stone-800">
                <span>Total</span>
                <span className="text-orange-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <p className="mb-4 text-center text-xs text-stone-400">
              By confirming, the kitchen will start preparing your order instantly.
            </p>
          </div>
        )}

        {/* Sticky Confirm Button */}
        {cart.length > 0 && (
          <div className="fixed right-0 bottom-18 left-0 z-40 border-t border-stone-100 bg-white p-5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] md:bottom-18 md:mx-auto md:max-w-md">
            <button
              onClick={placeOrder}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 text-lg font-bold text-white transition-transform active:scale-[0.98]"
            >
              Confirm Order <ChevronLeft size={20} className="rotate-180" />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderConfirmation = () => (
    <div className="animate-in zoom-in-95 flex min-h-screen flex-col items-center justify-center bg-stone-50 px-5 pb-20 duration-500">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-500 shadow-sm">
        <CheckCircle2 size={48} />
      </div>
      <h1 className="mb-2 text-center text-2xl font-bold text-stone-800">Order Confirmed!</h1>
      <p className="mb-8 text-center text-stone-500">
        Your order has been sent to the kitchen and will be served to Table 12 shortly.
      </p>

      <div className="mb-8 w-full rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-4">
          <span className="text-sm text-stone-500">Order ID</span>
          <span className="font-bold text-stone-800">{orderHistory[0]?.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-stone-500">Est. Time</span>
          <span className="font-bold text-orange-600">10-15 mins</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => navigateTo('history')}
          className="w-full rounded-2xl bg-orange-500 py-4 text-lg font-bold text-white shadow-sm"
        >
          View Order History
        </button>
        <button
          onClick={() => navigateTo('home')}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-200 py-4 text-lg font-bold text-stone-700"
        >
          <Plus size={20} /> Order More Items
        </button>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="animate-in fade-in min-h-screen bg-stone-50 pb-24 duration-300">
      <div className="sticky top-0 z-10 border-b border-stone-100 bg-white px-5 pt-8 pb-4 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-stone-800">Session History</h1>
      </div>

      <div className="mt-6 px-5">
        {orderHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <History size={48} className="mb-4 text-stone-300" />
            <h2 className="mb-2 text-lg font-bold text-stone-800">No orders yet</h2>
            <p className="text-stone-500">Orders placed during this session will appear here.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                onClick={() => navigateTo('order-detail', order)}
                className="cursor-pointer rounded-3xl border border-stone-100 bg-white p-5 shadow-sm transition-transform active:scale-[0.98]"
              >
                <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="font-bold text-stone-800">{order.id}</span>
                    <p className="mt-1 text-xs text-stone-400">
                      {order.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                    <Clock size={12} /> {order.status}
                  </div>
                </div>

                <div className="mb-4 space-y-3">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-stone-100 text-xs font-bold text-stone-600">
                          {item.quantity}x
                        </span>
                        <span className="text-stone-700">{item.name}</span>
                      </div>
                      <span className="text-stone-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                  <span className="text-sm font-semibold text-stone-600">Total</span>
                  <span className="text-lg font-bold text-stone-800">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 border-t border-stone-50 pt-3 text-sm font-semibold text-orange-500">
                  View Details <ChevronLeft size={16} className="rotate-180" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderOrderDetail = () => {
    if (!selectedOrder) return null;

    const subtotal = selectedOrder.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.08;

    return (
      <div className="animate-in slide-in-from-right min-h-screen bg-stone-50 pb-24 duration-300">
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-stone-100 bg-white px-5 pt-8 pb-4 shadow-sm">
          <button
            onClick={() => navigateTo('history')}
            className="-ml-2 rounded-full p-2 text-stone-600 transition hover:bg-stone-100"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-stone-800">Order Details</h1>
        </div>

        <div className="mt-6 px-5">
          <div className="mb-6 rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="mb-1 block text-sm text-stone-500">Order ID</span>
                <span className="font-bold text-stone-800">{selectedOrder.id}</span>
              </div>
              <div className="text-right">
                <span className="mb-1 block text-sm text-stone-500">Status</span>
                <span className="flex items-center justify-end gap-1 font-bold text-orange-600">
                  <Clock size={14} /> {selectedOrder.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-stone-500">
              Placed at:{' '}
              {selectedOrder.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>

          <h3 className="mb-4 px-1 font-bold text-stone-800">
            Items ({selectedOrder.items.reduce((sum: number, i: any) => sum + i.quantity, 0)})
          </h3>
          <div className="mb-6 flex flex-col gap-3">
            {selectedOrder.items.map((item: any, i: number) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl border border-stone-100 bg-white p-4 shadow-sm"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h4 className="mb-2 text-sm leading-tight font-bold text-stone-800">
                    {item.name}
                  </h4>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-500">
                      {item.quantity}x ${item.price.toFixed(2)}
                    </span>
                    <span className="font-bold text-stone-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
            <div className="mb-3 flex justify-between text-sm text-stone-600">
              <span>Subtotal</span>
              <span className="font-medium text-stone-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="mb-4 flex justify-between border-b border-stone-100 pb-4 text-sm text-stone-600">
              <span>Tax (8%)</span>
              <span className="font-medium text-stone-800">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-stone-800">
              <span>Total</span>
              <span className="text-orange-600">${selectedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-100 py-4 text-lg font-bold text-orange-600 transition-transform active:scale-[0.98]"
          >
            <Plus size={20} /> Order More Items
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-md overflow-x-hidden bg-stone-50 font-sans text-stone-800 shadow-2xl">
      {/* Main Content Area */}
      {currentScreen === 'home' && renderHome()}
      {currentScreen === 'detail' && renderDetail()}
      {currentScreen === 'cart' && renderCart()}
      {currentScreen === 'confirmation' && renderConfirmation()}
      {currentScreen === 'history' && renderHistory()}
      {currentScreen === 'order-detail' && renderOrderDetail()}

      {/* Global Bottom Navigation (Hide on Detail and Confirmation) */}
      {(currentScreen === 'home' || currentScreen === 'cart' || currentScreen === 'history') && (
        <div className="pb-safe fixed right-0 bottom-0 left-0 z-50 border-t border-stone-100 bg-white shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] md:mx-auto md:max-w-md">
          <div className="flex h-16 items-center justify-around">
            <button
              onClick={() => navigateTo('home')}
              className={`flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${currentScreen === 'home' ? 'text-orange-500' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <Utensils
                size={20}
                className={currentScreen === 'home' ? 'fill-orange-500/20' : ''}
              />
              <span className="text-[10px] font-bold">Menu</span>
            </button>

            <button
              onClick={() => navigateTo('cart')}
              className={`relative flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${currentScreen === 'cart' ? 'text-orange-500' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <div className="relative">
                <ShoppingCart
                  size={20}
                  className={currentScreen === 'cart' ? 'fill-orange-500/20' : ''}
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold">Cart</span>
            </button>

            <button
              onClick={() => navigateTo('history')}
              className={`flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${currentScreen === 'history' ? 'text-orange-500' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <History
                size={20}
                className={currentScreen === 'history' ? 'fill-orange-500/20' : ''}
              />
              <span className="text-[10px] font-bold">Orders</span>
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className={`fixed top-4 right-4 left-4 z-60 transition-all duration-300 md:right-auto md:left-auto md:mx-auto md:w-full md:max-w-md md:px-4 ${toast.show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-20 opacity-0'}`}
      >
        <div
          className={`flex items-center gap-3 rounded-2xl p-4 font-medium text-white shadow-lg ${toast.type === 'error' ? 'bg-red-500' : 'bg-stone-800'}`}
        >
          {toast.type === 'error' ? (
            <X size={20} />
          ) : (
            <CheckCircle2 size={20} className="text-green-400" />
          )}
          <span>{toast.message}</span>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `,
        }}
      />
    </div>
  );
}

import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { CheckCircle2, X } from 'lucide-react';

export const App = () => {
  const [currentScreen, setCurrentScreen] = useState<
    'home' | 'detail' | 'cart' | 'history' | 'confirmation'
  >('home');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [detailQty, setDetailQty] = useState(1);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

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
    showToast(`Thêm ${quantity} ${item.name} vào đơn món!`);
  };

  return (
    <div className="hide-scrollbar relative mx-auto h-screen overflow-x-hidden overflow-y-auto bg-stone-50 font-sans text-stone-800 shadow-2xl">
      {currentScreen === 'home' && <Home navigateTo={navigateTo} />}
      {currentScreen === 'detail' && (
        <ProductDetail
          navigateTo={navigateTo}
          selectedItem={selectedItem}
          addToCart={addToCart}
          detailQty={detailQty}
          setDetailQty={setDetailQty}
        />
      )}

      {(currentScreen === 'home' || currentScreen === 'cart' || currentScreen === 'history') && (
        <BottomNav
          currentScreen={currentScreen}
          navigateTo={navigateTo}
          cartItemCount={cartItemCount}
        />
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
    </div>
  );
};

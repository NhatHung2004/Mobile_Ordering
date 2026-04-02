import { useEffect, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Toast from './components/Toast';
import Cart from './pages/Cart';
import Confirmation from './components/Confirmation';
import History from './pages/History';
import OrderDetail from './components/OrderDetail';
import { useMenuStore } from './store/menu';
import { useOrderStore } from './store/order';
import RequireTablePopup from './components/RequireTablePopup';

export const App = () => {
  const [currentScreen, setCurrentScreen] = useState<
    'home' | 'detail' | 'cart' | 'history' | 'confirmation' | 'order-detail'
  >('home');
  const [detailQty, setDetailQty] = useState(1);
  const [cart, setCart] = useState<any[]>([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const loadMenuData = useMenuStore((state) => state.loadMenuData);

  const { selectedItem, setSelectedItem } = useMenuStore();
  const { selectedOrder, setSelectedOrder, checkAndResetSession, setTable, currentTable } =
    useOrderStore();

  useEffect(() => {
    checkAndResetSession();

    const params = new URLSearchParams(window.location.search);
    const tableId = params.get('tableId');
    if (tableId) setTable(tableId);
  }, [checkAndResetSession, setTable]);

  useEffect(() => {
    loadMenuData();
  }, [loadMenuData]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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

  if (!currentTable) {
    return (
      <div className="relative mx-auto h-screen w-full bg-stone-50 md:max-w-md">
        <RequireTablePopup />
      </div>
    );
  }

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
      {currentScreen === 'cart' && (
        <Cart cart={cart} navigateTo={navigateTo} setCart={setCart} showToast={showToast} />
      )}
      {currentScreen === 'confirmation' && <Confirmation navigateTo={navigateTo} />}
      {currentScreen === 'history' && <History navigateTo={navigateTo} />}
      {currentScreen === 'order-detail' && (
        <OrderDetail navigateTo={navigateTo} selectedOrder={selectedOrder} />
      )}

      {(currentScreen === 'home' || currentScreen === 'cart' || currentScreen === 'history') && (
        <BottomNav
          currentScreen={currentScreen}
          navigateTo={navigateTo}
          cartItemCount={cartItemCount}
        />
      )}

      {/* Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
};

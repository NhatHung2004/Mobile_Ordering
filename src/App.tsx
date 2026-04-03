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
import { updateOrderStatus } from './service/menu';

export const App = () => {
  const [currentScreen, setCurrentScreen] = useState<
    'home' | 'detail' | 'cart' | 'history' | 'confirmation' | 'order-detail'
  >('home');
  const [detailQty, setDetailQty] = useState(1);
  const [cart, setCart] = useState<any[]>([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const loadMenuData = useMenuStore((state) => state.loadMenuData);

  const { selectedItem, setSelectedItem } = useMenuStore();
  const {
    selectedOrder,
    setCurrentOrderId,
    setSelectedOrder,
    checkAndResetSession,
    setTable,
    currentTable,
  } = useOrderStore();

  useEffect(() => {
    const handleVnpayReturn = async () => {
      const params = new URLSearchParams(window.location.search);
      const vnp_ResponseCode = params.get('vnp_ResponseCode');
      const vnp_TxnRef = params.get('vnp_TxnRef');

      if (vnp_ResponseCode) {
        if (vnp_ResponseCode === '00') {
          showToast('Thanh toán thành công! Chúc bạn ngon miệng.');

          const orderId = vnp_TxnRef?.split('_')[0];
          if (orderId) {
            try {
              // call API to update order status to "Completed"
              await updateOrderStatus(orderId, 'Completed');
            } catch (error) {
              console.error('Error updating order status:', error);
            }
          }

          setCurrentOrderId(null);
        } else {
          showToast('Thanh toán thất bại hoặc đã bị hủy!', 'error');
        }

        // window.history.replaceState({}, document.title, window.location.pathname);

        // Clean up VNPAY query params
        const keysToDelete: string[] = [];
        params.forEach((_value, key) => {
          if (key.startsWith('vnp_')) keysToDelete.push(key);
        });

        // Delete the VNPAY-related query parameters
        keysToDelete.forEach((key) => params.delete(key));

        // Update the URL without reloading the page
        const newSearch = params.toString() ? `?${params.toString()}` : '';
        const newUrl = `${window.location.pathname}${newSearch}`;

        // Use replaceState to avoid adding a new entry in the browser history
        window.history.replaceState({}, document.title, newUrl);
      }
    };

    void handleVnpayReturn();
  }, []);

  useEffect(() => {
    checkAndResetSession();

    const params = new URLSearchParams(window.location.search);
    const tableId = params.get('tableId');
    if (tableId) {
      setTable(tableId);
      params.delete('tableId');

      const newSearch = params.toString() ? `?${params.toString()}` : '';
      const newUrl = `${window.location.pathname}${newSearch}`;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [checkAndResetSession, setTable]);

  useEffect(() => {
    loadMenuData();
  }, [loadMenuData]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (message: any, type = 'success', time = 3000) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), time);
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
    showToast(`Thêm ${quantity} ${item.name} vào đơn món!`, 'success', 1000);
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

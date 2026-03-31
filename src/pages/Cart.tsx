import { ChevronLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

interface CartProps {
  cart: any[];
  navigateTo: (screen: string, payload?: any) => void;
  setCart: (cart: any) => void;
  showToast: (message: string, type?: string) => void;
  setOrderHistory: (history: any) => void;
}

export default function Cart({ cart, navigateTo, setCart, showToast, setOrderHistory }: CartProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (id: string) => {
    setCart((prev: any) => prev.filter((item: any) => item.id !== id));
    showToast('Món ăn đã được xóa khỏi đơn hàng', 'error');
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev: any) =>
      prev.map((item: any) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      total: total,
      timestamp: new Date().toLocaleTimeString('vi-VN', {
        hour12: false,
      }),
      status: 'Preparing',
    };

    setOrderHistory((prev: any) => [newOrder, ...prev]);
    setCart([]);
    navigateTo('confirmation');
  };

  return (
    <div className="animate-in fade-in min-h-screen bg-stone-50 pb-32 duration-300">
      <div className="sticky top-0 z-10 border-b border-stone-100 bg-white px-5 pt-4 pb-4 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-stone-800">Đơn món</h1>
      </div>

      {cart.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center px-5 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-orange-400">
            <ShoppingCart size={40} />
          </div>
          <h2 className="mb-2 text-xl font-bold text-stone-800">Chưa có món nào trong đơn</h2>
          <p className="mb-8 text-stone-500">
            Hãy thêm món vào đơn để chúng tôi có thể chuẩn bị cho bạn nhanh nhất nhé!
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="rounded-full bg-orange-500 px-8 py-3 font-bold text-white shadow-sm"
          >
            Khám phá menu
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
            <h3 className="mb-4 font-bold text-stone-800">Tóm tắt đơn hàng</h3>
            <div className="flex justify-between text-lg font-bold text-stone-800">
              <span>Tổng</span>
              <span className="text-orange-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <p className="mb-4 text-center text-xs text-stone-400">
            Khi bạn xác nhận đơn, chúng tôi sẽ bắt đầu chuẩn bị món ngay lập tức. Cảm ơn bạn đã đặt
            món tại nhà hàng của chúng tôi!
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
            Xác nhận đơn hàng <ChevronLeft size={20} className="rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import {
  History as HistoryIcon,
  Utensils,
  Banknote,
  QrCode,
  CheckCircle2,
  X,
  Clock,
  Plus,
} from 'lucide-react';
import { useOrderStore } from '../store/order';
import { getOrderHistoryApi, requestCash } from '../service/menu';
import { createVnPayUrl } from '../service/payment';

interface HistoryProps {
  navigateTo: (screen: string, payload?: any) => void;
}

export default function History({ navigateTo }: HistoryProps) {
  const { currentOrderId, currentTable } = useOrderStore();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentOrderId) {
      setIsLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const data: any = await getOrderHistoryApi(currentOrderId);
        setOrder(data);
      } catch (error) {
        console.error('Lỗi tải lịch sử:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [currentOrderId]);

  // States cho chức năng thanh toán
  const [paymentModal, setPaymentModal] = useState<'hidden' | 'select' | 'qr' | 'cash' | 'success'>(
    'hidden',
  );

  const handleCashPayment = async () => {
    if (currentTable == null) {
      console.error('Không có thông tin bàn để gọi thanh toán tiền mặt.');
      return;
    }

    setPaymentModal('cash');

    try {
      await requestCash({
        tableId: currentTable,
      });
    } catch (error) {
      console.error('Lỗi báo nhân viên:', error);
    }
  };

  const handleVnPayPayment = async () => {
    if (!currentOrderId) return;

    try {
      const res: any = await createVnPayUrl(currentOrderId);

      if (res && res.url) {
        window.location.href = res.url;
      }
    } catch (error) {
      console.error('Lỗi khởi tạo VNPAY:', error);
    }
  };

  if (isLoading)
    return <div className="p-10 text-center text-stone-500">Đang tải lịch sử đơn hàng...</div>;

  return (
    <div className="animate-in fade-in min-h-screen bg-stone-50 pb-24 duration-300">
      <div className="sticky top-0 z-20 bg-stone-50 pb-4">
        <div className="border-b border-stone-100 bg-white px-5 pt-4 pb-4 shadow-sm">
          <h1 className="text-center text-2xl font-bold text-stone-800">Lịch sử đơn món</h1>
        </div>

        {order && (
          <div className="px-5 pt-5">
            <div
              className={`relative flex flex-col rounded-3xl bg-stone-800 p-6 text-white shadow-sm transition-colors`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="mb-1 block text-sm font-medium text-stone-300">
                    Tổng cộng {order.items.length} đơn
                  </span>
                  <span className={`text-3xl font-bold text-orange-400`}>
                    {order.totalAmount.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className={`rounded-2xl bg-stone-700 p-3`}>
                  <Utensils size={24} className="text-stone-300" />
                </div>
              </div>
              <button
                onClick={() => setPaymentModal('select')}
                className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-[0.98]"
              >
                Thanh toán hóa đơn
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-5">
        {!order ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <HistoryIcon size={48} className="mb-4 text-stone-300" />
            <h2 className="mb-2 text-lg font-bold text-stone-800">Chưa có đơn món!</h2>
            <p className="text-stone-500">Đơn món bạn đặt sẽ hiển thị ở đây.</p>
            <button
              onClick={() => navigateTo('home')}
              className="mt-6 rounded-full bg-orange-500 px-8 py-3 font-bold text-white shadow-md transition-transform active:scale-95"
            >
              Xem thực đơn
            </button>
          </div>
        ) : (
          <div className="mt-2 space-y-5">
            <div className="rounded-3xl border border-stone-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="font-bold text-stone-800">Mã đơn: {order.id}</span>
                  <p className="mt-1 text-xs text-stone-400">
                    Bắt đầu gọi lúc: {new Date(order.orderTime).toLocaleString('vi-VN')}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                  <Clock size={12} /> {order.status}
                </div>
              </div>

              {/* LIST ITEMS TỪ DTO CỦA BACKEND */}
              <div className="mb-4 space-y-4">
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt="food"
                        className="h-12 w-12 shrink-0 rounded-lg bg-stone-100 object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col gap-1">
                      <span className="font-medium text-stone-700">{item.menuItemName}</span>
                      {item.note && (
                        <span className="text-xs text-stone-500 italic">Ghi chú: {item.note}</span>
                      )}
                      <span className="text-xs font-semibold text-stone-500">
                        {item.quantity} phần
                      </span>
                    </div>
                    <span className="shrink-0 font-bold text-stone-600">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigateTo('home')}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-orange-500 py-3 text-sm font-semibold text-orange-500 transition-colors hover:bg-orange-50 active:scale-[0.98]"
              >
                <Plus size={18} /> Gọi thêm món
              </button>
            </div>
          </div>
        )}
      </div>

      {paymentModal !== 'hidden' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-5 backdrop-blur-sm transition-opacity">
          <div className="animate-in zoom-in-95 relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            {paymentModal !== 'success' && (
              <button
                onClick={() => setPaymentModal('hidden')}
                className="absolute top-4 right-4 rounded-full bg-stone-100 p-2 text-stone-500"
              >
                <X size={20} />
              </button>
            )}

            {paymentModal === 'select' && (
              <>
                <h3 className="mb-6 text-center text-xl font-bold text-stone-800">
                  Chọn phương thức
                </h3>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleVnPayPayment}
                    className="flex items-center gap-4 rounded-2xl border border-stone-100 p-4 transition-colors hover:bg-orange-50"
                  >
                    <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                      <QrCode size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-stone-800">Chuyển khoản QR</p>
                      <p className="text-xs text-stone-500">Tự động xác nhận khi chuyển xong</p>
                    </div>
                  </button>
                  <button
                    onClick={handleCashPayment}
                    className="flex items-center gap-4 rounded-2xl border border-stone-100 p-4 transition-colors hover:bg-stone-50"
                  >
                    <div className="rounded-xl bg-green-100 p-3 text-green-600">
                      <Banknote size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-stone-800">Tiền mặt</p>
                      <p className="text-xs text-stone-500">Thanh toán cho nhân viên tại bàn</p>
                    </div>
                  </button>
                </div>
              </>
            )}

            {paymentModal === 'cash' && (
              <div className="pt-6 pb-2 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                  <Banknote size={40} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-stone-800">Đã gọi nhân viên</h3>
                <p className="text-stone-500">
                  Vui lòng chờ giây lát, nhân viên sẽ đến bàn để hỗ trợ bạn thanh toán tiền mặt.
                </p>
                <button
                  onClick={() => setPaymentModal('hidden')}
                  className="mt-8 w-full rounded-xl bg-stone-800 py-3 font-bold text-white"
                >
                  Đóng
                </button>
              </div>
            )}

            {/* View 4: Thành công (QR) */}
            {paymentModal === 'success' && (
              <div className="pt-6 pb-2 text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-500">
                  <CheckCircle2 size={50} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-stone-800">Thanh toán thành công!</h3>
                <p className="text-stone-500">Cảm ơn bạn đã dùng bữa tại nhà hàng.</p>
                <button
                  onClick={() => setPaymentModal('hidden')}
                  className="mt-8 w-full rounded-xl bg-green-500 py-3 font-bold text-white"
                >
                  Hoàn tất
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

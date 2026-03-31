import { ChevronLeft, Clock, History as HistoryIcon, Utensils } from 'lucide-react';

interface HistoryProps {
  navigateTo: (screen: string, payload?: any) => void;
  orderHistory: any[];
}

export default function History({ navigateTo, orderHistory }: HistoryProps) {
  const sessionTotal = orderHistory.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="animate-in fade-in min-h-screen bg-stone-50 pb-24 duration-300">
      <div className="sticky top-0 z-10 border-b border-stone-100 bg-white px-5 pt-4 pb-4 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-stone-800">Lịch sử đơn món</h1>
      </div>

      <div className="mt-6 px-5">
        {orderHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <HistoryIcon size={48} className="mb-4 text-stone-300" />
            <h2 className="mb-2 text-lg font-bold text-stone-800">Chưa có đơn món!</h2>
            <p className="text-stone-500">Đơn món bạn đặt sẽ hiển thị ở đây.</p>
          </div>
        ) : (
          <>
            {/* Session Total Summary Card */}
            <div className="mb-6 flex items-center justify-between rounded-3xl bg-stone-800 p-6 text-white shadow-sm">
              <div>
                <span className="mb-1 block text-sm font-medium text-stone-300">
                  Tổng cộng {orderHistory.length} đơn
                </span>
                <span className="text-3xl font-bold text-orange-400">
                  ${sessionTotal.toFixed(2)}
                </span>
              </div>
              <div className="rounded-2xl bg-stone-700 p-3">
                <Utensils size={24} className="text-stone-300" />
              </div>
            </div>

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
                      <p className="mt-1 text-xs text-stone-400">Gọi món lúc: {order.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                      <Clock size={12} />{' '}
                      {order.status === 'Preparing' ? 'Đang chuẩn bị' : 'Đã hoàn thành'}
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
                    <span className="text-sm font-semibold text-stone-600">Tổng cộng</span>
                    <span className="text-lg font-bold text-stone-800">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1 border-t border-stone-50 pt-3 text-sm font-semibold text-orange-500">
                    Xem chi tiết <ChevronLeft size={16} className="rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

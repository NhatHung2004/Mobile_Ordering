import { ChevronLeft, Clock, Plus } from 'lucide-react';

interface OrderDetailProps {
  navigateTo: (screen: string, payload?: any) => void;
  selectedOrder: any;
}

export default function OrderDetail({ navigateTo, selectedOrder }: OrderDetailProps) {
  if (!selectedOrder) return null;

  const total = selectedOrder.items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="animate-in slide-in-from-right min-h-screen bg-stone-50 pb-24 duration-300">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-stone-100 bg-white px-5 pt-4 pb-4 shadow-sm">
        <button
          onClick={() => navigateTo('history')}
          className="-ml-2 rounded-full p-2 text-stone-600 transition hover:bg-stone-100"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-stone-800">Chi tiết đơn</h1>
      </div>

      <div className="mt-6 px-5">
        <div className="mb-6 rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <span className="mb-1 block text-sm text-stone-500">Mã đơn</span>
              <span className="font-bold text-stone-800">{selectedOrder.id}</span>
            </div>
            <div className="text-right">
              <span className="mb-1 block text-sm text-stone-500">Trạng thái</span>
              <span className="flex items-center justify-end gap-1 font-bold text-orange-600">
                <Clock size={14} />{' '}
                {selectedOrder.status === 'Preparing' ? 'Đang chuẩn bị' : 'Đã hoàn thành'}
              </span>
            </div>
          </div>
          <div className="text-sm text-stone-500">
            Đặt vào:{' '}
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
                <h4 className="mb-2 text-sm leading-tight font-bold text-stone-800">{item.name}</h4>
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
          <div className="flex justify-between text-lg font-bold text-stone-800">
            <span>Tổng</span>
            <span className="text-orange-600">${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => navigateTo('home')}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-100 py-4 text-lg font-bold text-orange-600 transition-transform active:scale-[0.98]"
        >
          <Plus size={20} /> Gọi thêm món
        </button>
      </div>
    </div>
  );
}

import { CheckCircle2, Plus } from 'lucide-react';
import { useOrderStore } from '../store/order';

interface ConfirmationProps {
  navigateTo: (screen: string, payload?: any) => void;
}

export default function Confirmation({ navigateTo }: ConfirmationProps) {
  const { currentOrderId } = useOrderStore();

  return (
    <div className="animate-in zoom-in-95 flex min-h-screen flex-col items-center justify-center bg-stone-50 px-5 pb-20 duration-500">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-500 shadow-sm">
        <CheckCircle2 size={48} />
      </div>
      <h1 className="mb-2 text-center text-2xl font-bold text-stone-800">Xác nhận đơn hàng!</h1>
      <p className="mb-8 text-center text-stone-500">
        Đơn hàng của bạn đã được gửi đến bếp và sẽ được phục vụ tại bàn 12 trong thời gian ngắn.
      </p>

      <div className="mb-8 w-full rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-4">
          <span className="text-sm text-stone-500">Mã đơn hàng</span>
          <span className="font-bold text-stone-800">{currentOrderId}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-stone-500">Thời gian ước tính</span>
          <span className="font-bold text-orange-600">10-15 phút</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => navigateTo('history')}
          className="w-full rounded-2xl bg-orange-500 py-4 text-lg font-bold text-white shadow-sm"
        >
          Xem Lịch sử Đơn hàng
        </button>
        <button
          onClick={() => navigateTo('home')}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-200 py-4 text-lg font-bold text-stone-700"
        >
          <Plus size={20} /> Gọi thêm món
        </button>
      </div>
    </div>
  );
}

// src/components/RequireTablePopup.tsx
import { QrCode } from 'lucide-react';

export default function RequireTablePopup() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-stone-900/80 p-5 backdrop-blur-sm">
      <div className="animate-in zoom-in-95 flex w-full max-w-sm flex-col items-center rounded-3xl bg-white p-8 text-center shadow-2xl duration-300">
        {/* Icon */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <QrCode size={48} strokeWidth={1.5} />
        </div>

        {/* Nội dung */}
        <h2 className="mb-3 text-2xl font-bold text-stone-800">Yêu cầu quét mã QR</h2>
        <p className="mb-8 text-stone-500">
          Vui lòng quét mã QR được đặt tại bàn của bạn để xem thực đơn và bắt đầu gọi món.
        </p>

        {/* Nút giả lập (tùy chọn) */}
        <div className="w-full rounded-2xl bg-stone-100 py-4 text-sm font-bold text-stone-400">
          Chưa xác định số bàn
        </div>
      </div>
    </div>
  );
}

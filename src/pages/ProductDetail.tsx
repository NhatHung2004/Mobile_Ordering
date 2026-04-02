import { ChevronLeft, Clock, Flame, Minus, Plus, Star } from 'lucide-react';

interface ProductDetailProps {
  navigateTo: (screen: string, payload?: any) => void;
  selectedItem: any;
  addToCart: (item: any, quantity: number) => void;
  detailQty: number;
  setDetailQty: (qty: number) => void;
}

export default function ProductDetail({
  navigateTo,
  selectedItem,
  addToCart,
  detailQty,
  setDetailQty,
}: ProductDetailProps) {
  return (
    <div className="animate-in slide-in-from-right min-h-screen bg-stone-50 pb-24 duration-300">
      <div className="relative h-72 w-full">
        <img
          src={selectedItem.imageUrl}
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
            <div className="shrink-0 rounded-xl bg-orange-100 px-3 py-1.5 text-lg font-bold whitespace-nowrap text-orange-600">
              {selectedItem.price.toLocaleString('vi-VN')} đ
            </div>
          </div>

          {/* <div className="mb-6 flex flex-wrap gap-3">
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
          </div> */}

          <h3 className="mb-2 font-bold text-stone-800">Chi Tiết</h3>
          <p className="mb-8 text-sm leading-relaxed text-stone-500">{selectedItem.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between rounded-2xl border border-stone-100 bg-stone-50 p-2">
            <span className="px-4 font-semibold text-stone-700">Số lượng</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDetailQty(Math.max(1, detailQty - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-stone-600 shadow-sm transition-transform active:scale-90"
              >
                <Minus size={20} />
              </button>
              <span className="w-4 text-center text-lg font-bold text-stone-800">{detailQty}</span>
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
          <span>Thêm món</span>
          <span>{(selectedItem.price * detailQty).toLocaleString('vi-VN')} đ</span>
        </button>
      </div>
    </div>
  );
}

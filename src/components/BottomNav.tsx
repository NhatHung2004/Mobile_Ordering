import { History, ShoppingCart, Utensils } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  navigateTo: (screen: string) => void;
  cartItemCount: number;
}

export const BottomNav = ({ currentScreen, navigateTo, cartItemCount }: BottomNavProps) => {
  return (
    <div className="pb-safe fixed right-0 bottom-0 left-0 z-50 border-t border-stone-100 bg-white shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] md:mx-auto md:max-w-md">
      <div className="flex h-16 items-center justify-around">
        <button
          onClick={() => navigateTo('home')}
          className={`flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${currentScreen === 'home' ? 'text-orange-500' : 'text-stone-400 hover:text-stone-600'}`}
        >
          <Utensils size={20} className={currentScreen === 'home' ? 'fill-orange-500/20' : ''} />
          <span className="text-[10px] font-bold">Thực đơn</span>
        </button>

        <button
          onClick={() => navigateTo('cart')}
          className={`relative flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${currentScreen === 'cart' ? 'text-orange-500' : 'text-stone-400 hover:text-stone-600'}`}
        >
          <div className="relative">
            <ShoppingCart
              size={20}
              className={currentScreen === 'cart' ? 'fill-orange-500/20' : ''}
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Đơn món</span>
        </button>

        <button
          onClick={() => navigateTo('history')}
          className={`flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${currentScreen === 'history' ? 'text-orange-500' : 'text-stone-400 hover:text-stone-600'}`}
        >
          <History size={20} className={currentScreen === 'history' ? 'fill-orange-500/20' : ''} />
          <span className="text-[10px] font-bold">Lịch sử gọi món</span>
        </button>
      </div>
    </div>
  );
};

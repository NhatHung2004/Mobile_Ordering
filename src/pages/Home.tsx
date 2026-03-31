import { useState } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../constants/menuData';
import { Flame, Plus, Search, Star } from 'lucide-react';

export default function Home({
  navigateTo,
}: {
  navigateTo: (screen: string, payload?: any) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  let filteredMenu = MENU_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (activeCategory === 'Popular') {
    filteredMenu = filteredMenu.filter((item) => item.popular);
  } else if (activeCategory !== 'All') {
    filteredMenu = filteredMenu.filter((item) => item.category === activeCategory);
  }

  const popularItems = MENU_ITEMS.filter((item) => item.popular);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 hide-scrollbar pb-24 duration-300">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-5 pt-4 pb-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Bàn số 12</p>
            <h1 className="text-2xl font-bold text-stone-800">Đói rồi? 🍔</h1>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 shadow-sm">
            B12
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 transform text-stone-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm món ăn, đồ uống..."
            className="w-full rounded-2xl bg-stone-100 py-3 pr-4 pl-10 text-stone-800 transition-all outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="hide-scrollbar flex gap-3 overflow-x-auto px-5 py-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap shadow-sm transition-all ${
              activeCategory === cat.key
                ? 'bg-orange-500 text-white'
                : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Popular Section (Only show if no search and 'All' or 'Popular' selected) */}
      {!searchQuery && (activeCategory === 'All' || activeCategory === 'Popular') && (
        <div className="mb-8 px-5">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-stone-800">
            Món ăn nổi bật <Flame size={20} className="text-orange-500" />
          </h2>
          <div className="hide-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-4">
            {popularItems.map((item) => (
              <div
                key={`pop-${item.id}`}
                onClick={() => !item.isAvailable && navigateTo('detail', item)}
                className={`relative min-w-60 shrink-0 rounded-3xl border border-stone-100 bg-white p-3 shadow-sm transition-transform ${item.isAvailable ? 'opacity-70 grayscale-[0.5]' : 'cursor-pointer active:scale-95'}`}
              >
                <div className="relative mb-3 h-36 overflow-hidden rounded-2xl">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-stone-800 backdrop-blur-sm">
                    <Star size={12} className="fill-orange-400 text-orange-400" /> {item.rating}
                  </div>
                  {item.isAvailable && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                      <span className="rounded-full bg-stone-800 px-3 py-1.5 text-sm font-bold text-white">
                        Hết món
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="truncate font-bold text-stone-800">{item.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-orange-600">${item.price.toFixed(2)}</span>
                  <button
                    className={`rounded-xl p-2 ${item.isAvailable ? 'bg-stone-100 text-stone-400' : 'bg-orange-100 text-orange-600'}`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu List */}
      <div className="px-5">
        <h2 className="mb-4 text-lg font-bold text-stone-800">
          {searchQuery ? 'Search Results' : activeCategory === 'All' ? 'Thực đơn' : activeCategory}
        </h2>
        <div className="flex flex-col gap-4">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <div
                key={`list-${item.id}`}
                onClick={() => !item.isAvailable && navigateTo('detail', item)}
                className={`relative flex gap-4 overflow-hidden rounded-3xl border border-stone-100 bg-white p-3 shadow-sm transition-transform ${item.isAvailable ? 'opacity-70 grayscale-[0.5]' : 'cursor-pointer active:scale-[0.98]'}`}
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  {item.isAvailable && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[2px]"></div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="mb-1 flex items-start justify-between">
                    <h3 className="leading-tight font-bold text-stone-800">{item.name}</h3>
                  </div>
                  <p className="mb-2 line-clamp-2 text-xs text-stone-500">{item.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    {item.isAvailable ? (
                      <span className="text-sm font-bold text-red-500">Hết món</span>
                    ) : (
                      <span className="font-bold text-orange-600">${item.price.toFixed(2)}</span>
                    )}
                    <div className="flex items-center gap-1 rounded-lg bg-stone-100 px-2 py-1 text-xs font-medium text-stone-500">
                      <Star size={12} className="fill-orange-400 text-orange-400" /> {item.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-stone-500">
              <Search size={40} className="mx-auto mb-3 text-stone-300" />
              <p>No items found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

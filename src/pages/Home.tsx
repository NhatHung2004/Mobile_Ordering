import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useMenuStore } from '../store/menu';
import { useOrderStore } from '../store/order';

interface HomeProps {
  navigateTo: (screen: string, payload?: any) => void;
}

export default function Home({ navigateTo }: HomeProps) {
  const { menuItems, categories, isLoading } = useMenuStore();
  const { currentTable } = useOrderStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<number | 'All'>('All');

  const filteredMenu = useMemo(() => {
    return menuItems.filter((item: any) => {
      const matchesCategory = activeCategoryId === 'All' || item.categoryId === activeCategoryId;

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.categoryName && item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategoryId, menuItems]);

  if (isLoading) return <div>Đang tải menu...</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 hide-scrollbar pb-24 duration-300">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-5 pt-4 pb-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Bàn số {currentTable}</p>
            <h1 className="text-2xl font-bold text-stone-800">Đói rồi? 🍔</h1>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 shadow-sm">
            B{currentTable}
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
        <button
          onClick={() => setActiveCategoryId('All')}
          className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
            activeCategoryId === 'All'
              ? 'bg-orange-500 text-white shadow-md'
              : 'border border-stone-200 bg-white text-stone-600'
          }`}
        >
          Tất cả
        </button>
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategoryId === cat.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="px-5">
        <h2 className="mb-4 text-lg font-bold text-stone-800">
          {searchQuery ? 'Kết quả tìm kiếm' : 'Thực đơn'}
        </h2>
        <div className="flex flex-col gap-4">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item: any) => (
              <div
                key={item.id}
                onClick={() => item.isAvailable && navigateTo('detail', item)}
                className={`relative flex gap-4 overflow-hidden rounded-3xl border border-stone-100 bg-white p-3 shadow-sm transition-transform ${!item.isAvailable ? 'opacity-70 grayscale-[0.5]' : 'cursor-pointer active:scale-[0.98]'}`}
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="mb-1 flex items-start justify-between">
                    <h3 className="leading-tight font-bold text-stone-800">{item.name}</h3>
                  </div>
                  <p className="mb-2 line-clamp-2 text-xs text-stone-500">{item.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    {!item.isAvailable ? (
                      <span className="text-sm font-bold text-red-500">Hết món</span>
                    ) : (
                      <span className="font-bold text-orange-600">
                        {item.price.toLocaleString('vi-VN')} đ
                      </span>
                    )}
                    {/* <div className="flex items-center gap-1 rounded-lg bg-stone-100 px-2 py-1 text-xs font-medium text-stone-500">
                      <Star size={12} className="fill-orange-400 text-orange-400" /> 5.0
                    </div> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-stone-500">
              <p>Không tìm thấy món "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

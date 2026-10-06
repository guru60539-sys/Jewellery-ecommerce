import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { currentView, navigateTo, cartCount, wishlist } = useShop();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, view: 'home' as const },
    { id: 'shop', label: 'Shop', icon: Compass, view: 'shop' as const },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length, view: 'account' as const },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, count: cartCount, view: 'cart' as const },
    { id: 'account', label: 'Account', icon: User, view: 'account' as const },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#0E0E0E]/95 backdrop-blur-md border-t border-[#E8E3D9] dark:border-[#222222] py-2 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.view)}
              className={`flex flex-col items-center justify-center py-1 px-3 relative transition-colors ${
                isActive ? 'text-[#D4AF37]' : 'text-[#7A7366] dark:text-[#9A9386]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#D4AF37] text-[#151413] text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl backdrop-blur-md border border-[#D4AF37]/30 bg-[#FAF8F5]/95 dark:bg-[#1A1A1A]/95 text-[#1E1C1A] dark:text-[#F3EFEA] transition-all transform animate-in slide-in-from-bottom duration-300"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && (
              <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#B38F24] shrink-0" />
            )}
            <p className="text-sm font-medium tracking-wide">{toast.message}</p>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="p-1 hover:text-[#D4AF37] transition-colors ml-2"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

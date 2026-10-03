import React from 'react';
import { useBooking } from '../context/BookingContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useBooking();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
          info: <Info className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#141618] border border-[#282c30] text-[#f4efe8] p-3.5 rounded-lg shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
          >
            {icons[toast.type]}
            <p className="text-xs text-[#eae3d8] flex-grow leading-relaxed">
              {toast.message}
            </p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#eae3d8]/40 hover:text-[#f4efe8] p-0.5 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

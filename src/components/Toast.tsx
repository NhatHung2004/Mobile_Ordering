import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  toast: {
    message: string;
    type: string;
    show: boolean;
  };
}

export default function Toast({ toast }: ToastProps) {
  return (
    <div
      className={`fixed top-4 right-4 left-4 z-60 transition-all duration-300 md:right-auto md:left-auto md:mx-auto md:w-full md:max-w-md md:px-4 ${toast.show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-20 opacity-0'}`}
    >
      <div
        className={`flex items-center gap-3 rounded-2xl p-4 font-medium text-white shadow-lg ${toast.type === 'error' ? 'bg-red-500' : 'bg-stone-800'}`}
      >
        {toast.type === 'error' ? (
          <X size={20} />
        ) : (
          <CheckCircle2 size={20} className="text-green-400" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

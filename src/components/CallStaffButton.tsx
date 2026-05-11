import { useState } from 'react';
import { useOrderStore } from '../store/order';
import { callStaff } from '../service/staff';

interface CallStaffButtonProps {
  onCall?: () => void;
  showToast?: (message: string, type?: string, time?: number) => void;
}

export const CallStaffButton = ({ onCall, showToast }: CallStaffButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentTable } = useOrderStore();

  const handleCall = async () => {
    if (!currentTable) {
      console.warn('No table selected');
      return;
    }

    setIsLoading(true);
    try {
      await callStaff(currentTable);
      if (showToast) {
        showToast('Đã gọi nhân viên, vui lòng chờ...', 'success', 3000);
      }
      if (onCall) {
        await onCall();
      }
    } catch (error) {
      console.error('Error calling staff:', error);
      if (showToast) {
        showToast('Lỗi khi gọi nhân viên, vui lòng thử lại', 'error', 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCall}
      disabled={isLoading}
      className="fixed right-4 bottom-20 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-all duration-200 active:scale-95 disabled:bg-red-400"
      title="Gọi nhân viên"
    >
      <span className="text-2xl">{isLoading ? '⏳' : '🔔'}</span>
    </button>
  );
};

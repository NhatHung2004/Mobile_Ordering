import { normalRequest } from '../configs/http';

export const callStaff = async (tableId: string | number) => {
  try {
    const res = await normalRequest(`/api/notifications/call-staff/${tableId}`, {
      method: 'POST',
    });
    console.log('Staff called successfully');
    return res;
  } catch (error) {
    console.error('Error calling staff:', error);
    throw error;
  }
};

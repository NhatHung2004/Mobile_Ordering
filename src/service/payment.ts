import { normalRequest } from "../configs/http";

export const createVnPayUrl = async (orderId: string | number) => {
  try {
    const res = await normalRequest('/api/payments/vnpay/create-url', {
      method: 'POST',
      body: { orderId },
    });
    return res;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

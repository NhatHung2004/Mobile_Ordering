import { normalRequest } from '../http/client';

interface MenuResponse {
  items: any[];
  [key: string]: any;
}

export const fetchMenuItems = async () => {
  try {
    const res = await normalRequest<MenuResponse>('/api/menu_items', {
      method: 'GET',
    });
    return res?.items || [];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const createOrderApi = async (orderPayload: any) => {
  try {
    const res = await normalRequest('/api/orders', {
      method: 'POST',
      body: orderPayload,
    });
    return res;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

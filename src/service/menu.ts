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

export const editOrderApi = async (orderPayload: any, orderId: string | number) => {
  try {
    const res = await normalRequest(`/api/orders/${orderId}`, {
      method: 'PUT',
      body: orderPayload,
    });
    return res;
  } catch (error) {
    console.error('Error editing order:', error);
    throw error;
  }
};

export const getOrderHistoryApi = async (currentOrderId: string | number) => {
  try {
    const res = await normalRequest(`/api/orders/${currentOrderId}`, {
      method: 'GET',
    });
    return res || [];
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};

export const requestCash = async (payload: { tableId: string | number }) => {
  try {
    const res = await normalRequest('/api/orders/call-staff', {
      method: 'POST',
      body: payload,
    });
    return res;
  } catch (error) {
    console.error('Error requesting cash:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string | number, status: string) => {
  try {
    const res = await normalRequest(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      body: { status },
    });
    return res;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

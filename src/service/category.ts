import { normalRequest } from "../configs/http";

export const fetchCategories = async () => {
  try {
    const res = await normalRequest('/api/categories', {
      method: 'GET',
    });
    return res;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

import { normalRequest } from '../configs/http';

export const checkTableEntry = async (tableId: string | number) => {
  try {
    const res = await normalRequest(`/api/tables/${tableId}/entry`, {
      method: 'GET',
    });
    console.log('Data tra ve: ', res);
    return res;
  } catch (error) {
    console.error('Error checking table entry:', error);
  }
};

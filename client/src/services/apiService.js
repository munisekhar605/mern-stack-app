import axios from 'axios';

export const getTransactions = async (page, perPage, search) => {
  try {
    const response = await axios.get('http://localhost:3001/api/transactions', {
      params: { page, perPage, search }
    });
    // Log the API response to debug
    console.log('API Response:', response.data);
    
    // Ensure you return only the transactions array
    return response.data.data || [];  // Fallback to an empty array if data is undefined
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];  // Fallback to an empty array in case of error
  }
};

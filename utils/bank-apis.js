import api from './api'; // Import the base API configuration

//-----------------BANK OPERATIONS-------------------------

/**
 * Validate IFSC code
 * @param {string} ifsc - IFSC code to validate
 * @returns {Promise<Object>} - Response data from the API
 */
export const validateIFSC = async (ifsc) => {
  try {
    const response = await api.get(`/bank/validate-ifsc/${ifsc}/`);
    console.log('Validate IFSC Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Validate IFSC Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Add a new bank account
 * @param {Object} bankData - Bank account data
 * @returns {Promise<Object>} - Response data from the API
 */
export const addBankAccount = async (bankData) => {
  try {
    const response = await api.post('/bank/add-bank/', bankData);
    console.log('Add Bank Account Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Add Bank Account Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get list of bank accounts with optional filters
 * @param {Object} params - Optional query parameters (e.g., bank_name, branch_name, account_type, etc.)
 * @returns {Promise<Object>} - Response data from the API
 */
export const getBankList = async (params = {}) => {
  try {
    const response = await api.get('/bank/bank-list/', {
      params: {
        bank_name: params.bank_name,
        branch_name: params.branch_name,
        account_type: params.account_type,
        account_status: params.account_status,
        nominee: params.nominee,
        account_balance__gte: params.account_balance__gte,
        account_balance__lte: params.account_balance__lte,
        account_opening_date__gte: params.account_opening_date__gte,
        account_opening_date__lte: params.account_opening_date__lte,
        sort_by: params.sort_by || 'account_holder_name', // Default sort by 'account_holder_name'
        order: params.order || 'asc', // Default order 'asc'
      },
    });
    console.log('Get Bank List Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Bank List Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get details of a specific bank account by ID
 * @param {number} bankId - ID of the bank account
 * @returns {Promise<Object>} - Response data from the API
 */
export const getBankDetail = async (bankId) => {
  try {
    const response = await api.get(`/bank/bank-detail/${bankId}/`);
    console.log('Get Bank Detail Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Bank Detail Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Add a passbook to a specific bank account
 * @param {number} bankId - ID of the bank account
 * @param {File} file - Passbook file to upload
 * @returns {Promise<Object>} - Response data from the API
 */
export const addPassbook = async (bankId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/bank/${bankId}/add-passbook/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Add Passbook Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Add Passbook Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Delete a bank account by ID
 * @param {number} bankId - ID of the bank account to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteBankAccount = async (bankId) => {
  try {
    const response = await api.delete(`/bank/delete-bank/${bankId}/`);
    console.log('Delete Bank Account Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Delete Bank Account Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Edit details of a specific bank account
 * @param {number} bankId - ID of the bank account to edit
 * @param {Object} bankData - Updated bank account data
 * @returns {Promise<Object>} - Response data from the API
 */
export const editBankAccount = async (bankId, bankData) => {
  try {
    const response = await api.put(`/bank/bank-edit/${bankId}/`, bankData);
    console.log('Edit Bank Account Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Edit Bank Account Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};
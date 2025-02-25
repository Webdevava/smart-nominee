import api from './api'; // Import the base API configuration

//-----------------DEPOSIT OPERATIONS-------------------------

/**
 * Delete a deposit by ID
 * @param {string} depositType - Type of deposit (e.g., FD, RD)
 * @param {number} depositId - ID of the deposit to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteDeposit = async (depositType, depositId) => {
  try {
    const response = await api.delete(`/deposit/delete-deposit/${depositType}/${depositId}/`);
    console.log('Delete Deposit Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Delete Deposit Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Add a document to a deposit
 * @param {number} depositId - ID of the deposit
 * @param {File} file - Document file to upload
 * @returns {Promise<Object>} - Response data from the API
 */
export const addDepositDoc = async (depositId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`/deposit/${depositId}/add-doc/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Add Deposit Document Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Add Deposit Document Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get list of deposits with optional filters
 * @param {Object} params - Optional query parameters (e.g., deposit_type, status, etc.)
 * @returns {Promise<Object>} - Response data from the API
 */
export const getRDList = async (params = {}) => {
  try {
    const response = await api.get('/deposit/RD/list/', {
      params: {
        deposit_type: params.deposit_type,
        status: params.status,
        sort_by: params.sort_by || 'maturity_date', // Default sort by 'id'
        order: params.order || 'asc', // Default order 'asc'
      },
    });
    console.log('Get Deposit List Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Deposit List Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};


/**
 * Get list of deposits with optional filters
 * @param {Object} params - Optional query parameters (e.g., deposit_type, status, etc.)
 * @returns {Promise<Object>} - Response data from the API
 */
export const getFDList = async (params = {}) => {
  try {
    const response = await api.get('/deposit/FD/list/', {
      params: {
        deposit_type: params.deposit_type,
        status: params.status,
        sort_by: params.sort_by || 'maturity_date', // Default sort by 'id'
        order: params.order || 'asc', // Default order 'asc'
      },
    });
    console.log('Get Deposit List Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Deposit List Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get details of a specific deposit by ID
 * @param {number} depositId - ID of the deposit
 * @returns {Promise<Object>} - Response data from the API
 */
export const getDepositDetail = async (depositId) => {
  try {
    const response = await api.get(`/deposit/deposit-detail/${depositId}/`);
    console.log('Get Deposit Detail Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Deposit Detail Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Create a new deposit
 * @param {Object} depositData - Deposit data
 * @returns {Promise<Object>} - Response data from the API
 */
export const addDeposit = async (depositData) => {
  try {
    const response = await api.post('/deposit/add-deposit/', depositData);
    console.log('Add Deposit Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Add Deposit Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};


/**
 * Update a deposit by ID
 * @param {number} depositId - ID of the deposit to update
 * @param {Object} depositData - Updated deposit data
 * @returns {Promise<Object>} - Response data from the API
 */
export const updateDeposit = async (depositId, depositData) => {
  try {
    const response = await api.put(`/deposit/update-deposit/${depositId}/`, depositData);
    console.log('Update Deposit Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Update Deposit Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get nominee list for a deposit
 * @param {number} depositId - ID of the deposit
 * @returns {Promise<Object>} - Response data from the API
 */
export const getDepositNominees = async (depositId) => {
  try {
    const response = await api.get(`/deposit/${depositId}/nominees/`);
    console.log('Get Deposit Nominees Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Deposit Nominees Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Add a nominee to a deposit
 * @param {number} depositId - ID of the deposit
 * @param {Object} nomineeData - Nominee data
 * @returns {Promise<Object>} - Response data from the API
 */
export const addDepositNominee = async (depositId, nomineeData) => {
  try {
    const response = await api.post(`/deposit/${depositId}/add-nominee/`, nomineeData);
    console.log('Add Deposit Nominee Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Add Deposit Nominee Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Update a nominee for a deposit
 * @param {number} depositId - ID of the deposit
 * @param {number} nomineeId - ID of the nominee to update
 * @param {Object} nomineeData - Updated nominee data
 * @returns {Promise<Object>} - Response data from the API
 */
export const updateDepositNominee = async (depositId, nomineeId, nomineeData) => {
  try {
    const response = await api.put(`/deposit/${depositId}/update-nominee/${nomineeId}/`, nomineeData);
    console.log('Update Deposit Nominee Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Update Deposit Nominee Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Delete a nominee from a deposit
 * @param {number} depositId - ID of the deposit
 * @param {number} nomineeId - ID of the nominee to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteDepositNominee = async (depositId, nomineeId) => {
  try {
    const response = await api.delete(`/deposit/${depositId}/delete-nominee/${nomineeId}/`);
    console.log('Delete Deposit Nominee Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Delete Deposit Nominee Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get documents for a deposit
 * @param {number} depositId - ID of the deposit
 * @returns {Promise<Object>} - Response data from the API
 */
export const getDepositDocuments = async (depositId) => {
  try {
    const response = await api.get(`/deposit/${depositId}/documents/`);
    console.log('Get Deposit Documents Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Deposit Documents Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};
import api from './api'; // Import the base API configuration

//-----------------TERM INSURANCE OPERATIONS-------------------------

/**
 * Create a new term insurance policy
 * @param {Object} termData - Term insurance data
 * @returns {Promise<Object>} - Response data from the API
 */
export const createTermInsurance = async (termData) => {
  try {
    const response = await api.post('/insurance/term-insurance/', termData);
    console.log('Create Term Insurance Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create Term Insurance Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Get list of all term insurance records with optional sorting
 * @param {Object} params - Optional query parameters (sort_by, order)
 * @returns {Promise<Object>} - Response data from the API
 */
export const listTermInsurance = async (params = {}) => {
  try {
    const response = await api.get('/insurance/list-term-insurance/', {
      params: {
        sort_by: params.sort_by,
        order: params.order || 'asc', // Default order 'asc'
      },
    });
    console.log('List Term Insurance Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('List Term Insurance Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Upload a document for a specific term insurance record
 * @param {number} id - ID of the term insurance record
 * @param {File} file - Document file to upload
 * @returns {Promise<Object>} - Response data from the API
 */
export const uploadTermInsuranceDocument = async (id, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/insurance/term-insurance/${id}/document/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload Term Insurance Document Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Upload Term Insurance Document Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Delete a term insurance record by ID
 * @param {number} id - ID of the term insurance record to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteTermInsurance = async (id) => {
  try {
    const response = await api.delete(`/insurance/term-insurance/${id}/`);
    console.log('Delete Term Insurance Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete Term Insurance Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Update an existing term insurance record
 * @param {number} id - ID of the term insurance record to update
 * @param {Object} termData - Updated term insurance data
 * @returns {Promise<Object>} - Response data from the API
 */
export const updateTermInsurance = async (id, termData) => {
  try {
    const response = await api.put(`/insurance/term-insurance/${id}/`, termData);
    console.log('Update Term Insurance Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update Term Insurance Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Get details of a specific term insurance policy by ID
 * @param {number} id - ID of the term insurance policy
 * @returns {Promise<Object>} - Response data from the API
 */
export const getTermInsuranceDetails = async (id) => {
  try {
    const response = await api.get(`/insurance/term-insurance/${id}/`);
    console.log('Get Term Insurance Details Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Term Insurance Details Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

//-----------------MEDICAL INSURANCE OPERATIONS-------------------------

/**
 * Create a new medical insurance policy
 * @param {Object} medicalData - Medical insurance data
 * @returns {Promise<Object>} - Response data from the API
 */
export const createMedicalInsurance = async (medicalData) => {
  try {
    const response = await api.post('/insurance/medical-insurance/', medicalData);
    console.log('Create Medical Insurance Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create Medical Insurance Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Get list of all medical insurance records with optional sorting
 * @param {Object} params - Optional query parameters (sort_by, order)
 * @returns {Promise<Object>} - Response data from the API
 */
export const listMedicalInsurance = async (params = {}) => {
  try {
    const response = await api.get('/insurance/list-medical-insurance/', {
      params: {
        sort_by: params.sort_by,
        order: params.order || 'asc', // Default order 'asc'
      },
    });
    console.log('List Medical Insurance Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('List Medical Insurance Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Upload a document for a specific medical insurance record
 * @param {number} id - ID of the medical insurance record
 * @param {File} file - Document file to upload
 * @returns {Promise<Object>} - Response data from the API
 */
export const uploadMedicalInsuranceDocument = async (id, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/insurance/medical-insurance/${id}/document/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload Medical Insurance Document Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Upload Medical Insurance Document Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Delete a medical insurance record by ID
 * @param {number} id - ID of the medical insurance record to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteMedicalInsurance = async (id) => {
  try {
    const response = await api.delete(`/insurance/medical-insurance/${id}/`);
    console.log('Delete Medical Insurance Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete Medical Insurance Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Update an existing medical insurance record
 * @param {number} id - ID of the medical insurance record to update
 * @param {Object} medicalData - Updated medical insurance data
 * @returns {Promise<Object>} - Response data from the API
 */
export const updateMedicalInsurance = async (id, medicalData) => {
  try {
    const response = await api.put(`/insurance/medical-insurance/${id}/`, medicalData);
    console.log('Update Medical Insurance Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update Medical Insurance Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/**
 * Get details of a specific medical insurance policy by ID
 * @param {number} id - ID of the medical insurance policy
 * @returns {Promise<Object>} - Response data from the API
 */
export const getMedicalInsuranceDetails = async (id) => {
  try {
    const response = await api.get(`/insurance/medical-insurance/${id}/`);
    console.log('Get Medical Insurance Details Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Medical Insurance Details Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};
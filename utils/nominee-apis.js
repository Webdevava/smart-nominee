import api from './api';

//-----------------NOMINEE OPERATIONS-------------------------

/**
 * Create a new nominee for a specific asset type
 * @param {string} assetType - Type of asset (bank or deposit)
 * @param {Object} nomineeData - Nominee data (nominee_id, percentage, asset_id)
 * @returns {Promise<Object>} - Response data from the API
 */
export const createNominee = async (assetType, nomineeData) => {
  try {
    const response = await api.post(`/api/nominee/${assetType}/`, nomineeData);
    console.log('Create Nominee Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Create Nominee Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Update a nominee for a specific asset type and nominee ID
 * @param {string} assetType - Type of asset (bank or deposit)
 * @param {number} assetNomineeId - ID of the nominee to update
 * @param {Object} nomineeData - Updated nominee data (percentage)
 * @returns {Promise<Object>} - Response data from the API
 */
export const updateNominee = async (assetType, assetNomineeId, nomineeData) => {
  try {
    const response = await api.put(`/api/nominee/${assetType}/${assetNomineeId}/`, nomineeData);
    console.log('Update Nominee Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Update Nominee Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Delete a nominee for a specific asset type and nominee ID
 * @param {string} assetType - Type of asset (bank or deposit)
 * @param {number} assetNomineeId - ID of the nominee to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteNominee = async (assetType, assetNomineeId) => {
  try {
    const response = await api.delete(`/api/nominee/${assetType}/${assetNomineeId}/`);
    console.log('Delete Nominee Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Delete Nominee Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};
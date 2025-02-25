import api from './api';

//-----------------CONTACT OPERATIONS-------------------------

/**
 * Add a new contact (email or phone number, but not both)
 * @param {Object} contactData - Contact data (either email or phone_number)
 * @returns {Promise<Object>} - Response data from the API
 */
export const addContact = async (contactData) => {
  try {
    const response = await api.post('/auth/contact/', contactData);
    console.log('Add Contact Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Add Contact Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * List contacts with optional filtering and sorting
 * @param {Object} params - Optional query parameters (e.g., phone_number, email, sort_by, order, emails_only, phones_only)
 * @returns {Promise<Object>} - Response data from the API
 */
export const listContacts = async (params = {}) => {
  try {
    const response = await api.get('/auth/contact/', {
      params: {
        phone_number: params.phone_number,
        email: params.email,
        sort_by: params.sort_by || 'id', // Default sort by 'id'
        order: params.order || 'asc', // Default order 'asc'
        emails_only: params.emails_only || false, // Default false
        phones_only: params.phones_only || false, // Default false
      },
    });
    console.log('List Contacts Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('List Contacts Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Update a contact by ID
 * @param {number} contactId - ID of the contact to update
 * @param {Object} contactData - Updated contact data (email or phone_number)
 * @returns {Promise<Object>} - Response data from the API
 */
export const updateContact = async (contactId, contactData) => {
  try {
    const response = await api.put(`/auth/contact/${contactId}/`, contactData);
    console.log('Update Contact Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Update Contact Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Delete a contact by ID
 * @param {number} contactId - ID of the contact to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteContact = async (contactId) => {
  try {
    const response = await api.delete(`/auth/contact/${contactId}/`);
    console.log('Delete Contact Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Delete Contact Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get details of a specific contact by ID
 * @param {number} contactId - ID of the contact
 * @returns {Promise<Object>} - Response data from the API
 */
export const getContactDetail = async (contactId) => {
  try {
    const response = await api.get(`/auth/contact/${contactId}/`);
    console.log('Get Contact Detail Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Contact Detail Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};
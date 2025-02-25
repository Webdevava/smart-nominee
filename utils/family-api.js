import api from './api';

//-----------------FAMILY MEMBER OPERATIONS-------------------------

/**
 * Create a new family member
 * @param {Object} memberData - Data for the new family member
 * @returns {Promise<Object>} - Response data from the API
 */
export const createFamilyMember = async (memberData) => {
  try {
    const response = await api.post('/family/family-member/', memberData);
    console.log('Create Family Member Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Create Family Member Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get list of family members with optional filtering and sorting
 * @param {Object} params - Optional query parameters (e.g., relationship, sort, order)
 * @returns {Promise<Object>} - Response data from the API
 */
export const getFamilyList = async (params = {}) => {
  try {
    const response = await api.get('/family/family-list/', {
      params: {
        relationship: params.relationship,
        sort: params.sort,
        order: params.order,
      },
    });
    console.log('Get Family List Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Family List Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get details of a specific family member
 * @param {string} familyMemberId - ID of the family member
 * @returns {Promise<Object>} - Response data from the API
 */
export const getFamilyMemberDetail = async (familyMemberId) => {
  try {
    const response = await api.get(`/family/member-detail/${familyMemberId}/`);
    console.log('Get Family Member Detail Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Family Member Detail Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Update family member details
 * @param {string} familyMemberId - ID of the family member to update
 * @param {Object} memberData - Updated data for the family member
 * @returns {Promise<Object>} - Response data from the API
 */
export const updateFamilyMember = async (familyMemberId, memberData) => {
  try {
    const response = await api.put(`/family/family-member/${familyMemberId}/`, memberData);
    console.log('Update Family Member Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Update Family Member Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Delete a family member
 * @param {string} memberId - ID of the family member to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteFamilyMember = async (memberId) => {
  try {
    const response = await api.delete(`/family/family-member/${memberId}/`);
    console.log('Delete Family Member Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Delete Family Member Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get list of all relationships
 * @returns {Promise<Object>} - Response data from the API
 */
export const getRelationList = async () => {
  try {
    const response = await api.get('/family/relation-list/');
    console.log('Get Relation List Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Relation List Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};
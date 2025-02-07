import api from './api';

// Create a new family member
export const createFamilyMember = async (memberData) => {
  try {
    const response = await api.post('/family/family-member/', memberData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get list of family members with optional filtering and sorting
export const getFamilyList = async (params = {}) => {
  try {
    const response = await api.get('/family/family-list/', {
      params: {
        relationship: params.relationship,
        sort: params.sort,
        order: params.order
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get details of a specific family member
export const getFamilyMemberDetail = async (familyMemberId) => {
  try {
    const response = await api.get(`/family/member-detail/${familyMemberId}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update family member details
export const updateFamilyMember = async (familyMemberId, memberData) => {
  try {
    const response = await api.put(`/family/family-member/${familyMemberId}/`, memberData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete a family member
export const deleteFamilyMember = async (memberId) => {
  try {
    const response = await api.delete(`/family/family-member/${memberId}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get list of all relationships
export const getRelationList = async () => {
  try {
    const response = await api.get('/family/relation-list/');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
import api from './api';

//-----------------DOCUMENT OPERATIONS-------------------------

/**
 * Create a new document
 * @param {Object} documentData - Document data (document_type, document_number, issue_date, expiry_date, extra_data)
 * @returns {Promise<Object>} - Response data from the API
 */
export const createDocument = async (documentData) => {
  try {
    const response = await api.post('/document/add/', documentData);
    console.log('Create Document Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Create Document Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Edit an existing document
 * @param {number} id - ID of the document to edit
 * @param {Object} documentData - Updated document data (document_number, issue_date, expiry_date, extra_data)
 * @returns {Promise<Object>} - Response data from the API
 */
export const editDocument = async (id, documentData) => {
  try {
    const response = await api.put(`/document/edit/${id}/`, documentData);
    console.log('Edit Document Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Edit Document Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Delete a document by ID
 * @param {number} id - ID of the document to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteDocument = async (id) => {
  try {
    const response = await api.delete(`/document/delete/${id}/`);
    console.log('Delete Document Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Delete Document Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get a list of all documents
 * @returns {Promise<Object>} - Response data from the API
 */
export const getDocumentList = async () => {
  try {
    const response = await api.get('/document/');
    console.log('Get Document List Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Document List Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get details of a specific document by ID
 * @param {number} id - ID of the document
 * @returns {Promise<Object>} - Response data from the API
 */
export const getDocumentDetail = async (id) => {
  try {
    const response = await api.get(`/document/${id}/`);
    console.log('Get Document Detail Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Get Document Detail Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Upload attachments for a document
 * @param {number} documentId - ID of the document
 * @param {Array<File>} files - Array of files to upload
 * @returns {Promise<Object>} - Response data from the API
 */
export const uploadDocumentAttachments = async (documentId, files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await api.post(`/document/${documentId}/attachments/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload Document Attachments Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Upload Document Attachments Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Delete a document attachment by ID
 * @param {number} documentId - ID of the document
 * @param {number} attachmentId - ID of the attachment to delete
 * @returns {Promise<Object>} - Response data from the API
 */
export const deleteDocumentAttachment = async (documentId, attachmentId) => {
  try {
    const response = await api.delete(`/document/${documentId}/attachments/${attachmentId}/`);
    console.log('Delete Document Attachment Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Delete Document Attachment Error:', error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};
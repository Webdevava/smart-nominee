import api from "./api";
import Cookies from "js-cookie";

//-----------------PROFILE OPERATIONS-------------------------

/**
 * Update user profile
 * @param {Object} profileData - Profile data (first_name, middle_name, last_name, pan, adhaar, dob, emergency_contacts)
 * @returns {Promise<Object>} - Response data from the API
 */
export const updateProfile = async (profileData) => {
  try {
    const response = await api.post("/profile/profile-update/", profileData);
    console.log("Update Profile Response:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error("Update Profile Error:", error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Add a passbook to the user profile
 * @param {Object} file - Passbook file to upload
 * @returns {Promise<Object>} - Response data from the API
 */
export const addPassbook = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/profile/add-profile/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Add Passbook Response:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error("Add Passbook Error:", error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

/**
 * Get user profile details and store in cookies
 * @returns {Promise<Object>} - Response data from the API
 */
export const getProfileDetail = async () => {
  try {
    const response = await api.get("/profile/get-profile-detail/");
    console.log("Get Profile Detail Response:", response.data); // Log the response

    // Check if the response contains valid data, even if status code is 400
    if (response.data && response.data.data) {
      Cookies.set("profile", JSON.stringify(response.data.data), {
        expires: 7,
      }); // Expires in 7 days
    }

    return response.data;
  } catch (error) {
    // Handle 400 status code with valid response
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data &&
      error.response.data.data
    ) {
      console.log("Get Profile Detail Response (400):", error.response.data); // Log the response
      Cookies.set("profile", JSON.stringify(error.response.data.data), {
        expires: 7,
      }); // Expires in 7 days
      return error.response.data;
    }

    console.error("Get Profile Detail Error:", error.response?.data || error); // Log the error
    throw error.response?.data || error;
  }
};

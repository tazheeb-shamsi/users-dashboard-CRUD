import axios from "axios";

const BASE_URL = "https://gorest.co.in/public-api";
const API_TOKEN =
  "c9fbd09a5e170f9eed4f8234370d18a3de44564f2e21445ecfdaad3a484bf9cc";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete user");
  }
};

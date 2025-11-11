import axios from "axios";

const API_BASE = "http://localhost:8081/api"; // adjust to your backend

// ----------- Auth ----------
export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${API_BASE}/login`, credentials);
    return response.data; // { token: "..." }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// ----------- Foods ----------
export async function fetchFoodList(token) {
  const response = await axios.get(`${API_BASE}/foods`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function fetchFoodById(id, token) {
  const response = await axios.get(`${API_BASE}/foods/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

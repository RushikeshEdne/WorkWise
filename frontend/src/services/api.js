import axios from 'axios';

// Set your backend base URL here
const API_URL = 'http://localhost:8000/api';

// User Authentication
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/register`, userData);
  return res.data;
};

// Employee Management
export const getAllEmployees = async () => {
  const res = await axios.get(`${API_URL}/admin/employees`);
  return res.data;
};

// Project Management
export const getAllProjects = async () => {
  const res = await axios.get(`${API_URL}/manager/projects`);
  return res.data;
};

export const addProject = async (projectData) => {
  const res = await axios.post(`${API_URL}/admin/projects`, projectData);
  return res.data;
};

// Leave Management
export const applyLeave = async (leaveData) => {

  const token = localStorage.getItem('token'); // Retrieve the token from localStorage


  const res = await axios.post(`${API_URL}/engineer/leaves`, leaveData,{
    headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json', // Ensure the content type is set to JSON
    },
    });
  return res.data;
};

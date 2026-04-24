const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API error');
  }
  return response.json();
};

export const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: getHeaders(token)
  });
  return handleResponse(response);
};

export const createTask = async (token, { title, description }) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ title, description })
  });
  return handleResponse(response);
};

export const updateTask = async (token, id, { title, description, status }) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify({ title, description, status })
  });
  return handleResponse(response);
};

export const deleteTask = async (token, id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token)
  });
  return handleResponse(response);
};

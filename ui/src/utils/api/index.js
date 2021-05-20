const URL = 'http://localhost:3000';

const getDefaultHeaders = () => {
  const token = localStorage.getItem('token');
  const Authorization = token ? `Bearer ${token}` : '';

  return {'Content-Type': 'application/json', Authorization};
};

const DELAY = 1000;

export default {
  post: async (path, body) => {
    const res = await fetch(`${URL}/api${path}`, {method: 'POST', headers: getDefaultHeaders(), body: JSON.stringify(body)});
    await new Promise(resolve => setTimeout(resolve, DELAY));

    return await res.json();
  },
  put: async (path, body) => {
    const res = await fetch(`${URL}/api${path}`, {method: 'PUT', headers: getDefaultHeaders(), body: JSON.stringify(body)});
    await new Promise(resolve => setTimeout(resolve, DELAY));

    return await res.json();
  },
  get: async path => {
    const res = await fetch(`${URL}/api${path}`, {method: 'GET', headers: getDefaultHeaders()});
    await new Promise(resolve => setTimeout(resolve, DELAY));

    return await res.json();
  },
  delete: async path => {
    const res = await fetch(`${URL}/api${path}`, {method: 'DELETE', headers: getDefaultHeaders()});
    await new Promise(resolve => setTimeout(resolve, DELAY));

    return await res.json();
  },
};

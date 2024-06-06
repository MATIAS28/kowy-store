import axios from 'axios';
const ADMIN_URI = process.env.NEXT_PUBLIC_ADMIN_URL

const auth = () => {
  
  if (typeof window !== "undefined" && JSON.parse(window.localStorage.getItem('admin'))) {
    return JSON.parse(window.localStorage.getItem('admin')).token 
  }

  return null
}

const axiosInstance = axios.create({
  baseURL: ADMIN_URI,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': auth
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = auth()

  if (token) {
    config.headers.Authorization = token
  }

  return config

}, (e) => {
  return Promise.reject(e)
})

export default axiosInstance;
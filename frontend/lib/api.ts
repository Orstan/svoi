import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const locale = localStorage.getItem('locale') || 'uk';
    config.headers['Accept-Language'] = locale;
  }
  return config;
});

export const authApi = {
  register: (data: any) => api.post('/register', data),
  login: (data: any) => api.post('/login', data),
  logout: () => api.post('/logout'),
  me: () => api.get('/me'),
  googleRedirect: () => api.get('/auth/google/redirect'),
  googleCallback: (code: string) => api.get(`/auth/google/callback?code=${code}`),
};

export const categoriesApi = {
  getAll: () => api.get('/categories'),
  list: () => api.get('/categories'),
  getBySlug: (slug: string) => api.get(`/categories/${slug}`),
};

export const locationsApi = {
  getAll: () => api.get('/locations'),
  getVoivodeships: () => api.get('/locations/voivodeships'),
  voivodeships: () => api.get('/locations/voivodeships'),
  getCities: (voivodeshipId?: number) => 
    api.get('/locations/cities', { params: { voivodeship_id: voivodeshipId } }),
  getBySlug: (slug: string) => api.get(`/locations/${slug}`),
};

export const mastersApi = {
  getAll: (params?: any) => api.get('/masters', { params }),
  list: (params?: any) => api.get('/masters', { params }),
  getById: (id: number) => api.get(`/masters/${id}`),
  show: (id: string) => api.get(`/masters/${id}`),
  create: (data: any) => api.post('/masters', data),
  update: (id: number, data: any) => api.put(`/masters/${id}`, data),
  uploadPortfolio: (id: number, formData: FormData) => 
    api.post(`/masters/${id}/portfolio`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deletePortfolioItem: (profileId: number, itemId: number) =>
    api.delete(`/masters/${profileId}/portfolio/${itemId}`),
};

export const reviewsApi = {
  create: (data: any) => 
    api.post(`/masters/${data.master_id}/reviews`, data),
  respond: (reviewId: number, data: any) => 
    api.post(`/reviews/${reviewId}/respond`, data),
};

export const favoritesApi = {
  getAll: () => api.get('/favorites'),
  list: () => api.get('/favorites'),
  add: (masterProfileId: number) => 
    api.post(`/favorites/${masterProfileId}/toggle`),
  remove: (masterProfileId: number) => 
    api.post(`/favorites/${masterProfileId}/toggle`),
  toggle: (masterProfileId: number) => 
    api.post(`/favorites/${masterProfileId}/toggle`),
  check: (masterProfileId: number) => 
    api.get(`/favorites/${masterProfileId}/check`),
};

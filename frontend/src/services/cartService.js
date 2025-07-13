import API from '../api/axios';

export const getCart = async () => {
  const response = await API.get('/api/cart');
  console.warn("tester",response.data);
  
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await API.post('/api/cart/addToCart', { productId, quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  console.warn("removeFromCart called with productId:", productId);
  
  const response = await API.delete(`/api/cart/removeFromCart/${productId}`);
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await API.put('/api/cart/updateQuantity', { productId, quantity });
  return response.data;
};
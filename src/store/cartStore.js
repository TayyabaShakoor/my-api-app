// src/store/cartStore.js
import { create } from 'zustand';

// ===== HELPERS FOR CART PERSISTENCE =====
const loadCart = () => {
  try {
    const saved = localStorage.getItem('cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        cart: parsed.cart || [],
        totalItems: parsed.totalItems || 0,
        totalPrice: parsed.totalPrice || 0,
      };
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
  return { cart: [], totalItems: 0, totalPrice: 0 };
};

const saveCart = (cart, totalItems, totalPrice) => {
  try {
    localStorage.setItem('cart', JSON.stringify({ cart, totalItems, totalPrice }));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

// ===== AUTH HELPERS =====
const loadAuth = () => {
  try {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (token && user) {
      return {
        isAuthenticated: true,
        user: JSON.parse(user),
        token: token,
      };
    }
  } catch (error) {
    console.error('Error loading auth:', error);
  }
  return {
    isAuthenticated: false,
    user: null,
    token: null,
  };
};

// ===== CREATE STORE =====
const useCartStore = create((set, get) => ({
  // ===== CART STATE =====
  cart: loadCart().cart,
  totalItems: loadCart().totalItems,
  totalPrice: loadCart().totalPrice,

  // ===== AUTH STATE =====
  isAuthenticated: loadAuth().isAuthenticated,
  user: loadAuth().user,
  token: loadAuth().token,

  // ===== CART ACTIONS =====
  addToCart: (product) => {
    const currentCart = get().cart;
    const existingItem = currentCart.find(item => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    saveCart(updatedCart, totalItems, totalPrice);

    set({ cart: updatedCart, totalItems, totalPrice });
  },

  removeFromCart: (productId) => {
    const currentCart = get().cart;
    const updatedCart = currentCart.filter(item => item.id !== productId);

    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    saveCart(updatedCart, totalItems, totalPrice);

    set({ cart: updatedCart, totalItems, totalPrice });
  },

  increaseQuantity: (productId) => {
    const currentCart = get().cart;
    const updatedCart = currentCart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    saveCart(updatedCart, totalItems, totalPrice);

    set({ cart: updatedCart, totalItems, totalPrice });
  },

  decreaseQuantity: (productId) => {
    const currentCart = get().cart;
    const item = currentCart.find(item => item.id === productId);

    let updatedCart;
    if (item.quantity === 1) {
      updatedCart = currentCart.filter(item => item.id !== productId);
    } else {
      updatedCart = currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }

    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    saveCart(updatedCart, totalItems, totalPrice);

    set({ cart: updatedCart, totalItems, totalPrice });
  },

  clearCart: () => {
    saveCart([], 0, 0);
    set({ cart: [], totalItems: 0, totalPrice: 0 });
  },

  // ===== AUTH ACTIONS =====
  login: (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Simulate API call
    const fakeToken = `fake-jwt-token-${Date.now()}`;
    const user = {
      email: email,
      name: email.split('@')[0],
      role: 'user',
    };

    localStorage.setItem('authToken', fakeToken);
    localStorage.setItem('user', JSON.stringify(user));

    set({
      isAuthenticated: true,
      user: user,
      token: fakeToken,
    });

    return { user, token: fakeToken };
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    set({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      set({
        isAuthenticated: true,
        user: JSON.parse(user),
        token: token,
      });
      return true;
    }

    return false;
  },
}));

export default useCartStore;
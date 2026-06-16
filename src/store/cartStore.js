// src/store/cartStore.js
import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  // State
  cart: [],
  totalItems: 0,
  totalPrice: 0,

  // Add to Cart
  addToCart: (product) => {
    const currentCart = get().cart;
    const existingItem = currentCart.find(item => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      // If product already in cart, increase quantity
      updatedCart = currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // If new product, add with quantity 1
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    set({
      cart: updatedCart,
      totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    });
  },

  // Remove from Cart
  removeFromCart: (productId) => {
    const currentCart = get().cart;
    const updatedCart = currentCart.filter(item => item.id !== productId);

    set({
      cart: updatedCart,
      totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    });
  },

  // Increase Quantity
  increaseQuantity: (productId) => {
    const currentCart = get().cart;
    const updatedCart = currentCart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    set({
      cart: updatedCart,
      totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    });
  },

  // Decrease Quantity
  decreaseQuantity: (productId) => {
    const currentCart = get().cart;
    const item = currentCart.find(item => item.id === productId);

    if (item.quantity === 1) {
      // If quantity is 1, remove the item
      get().removeFromCart(productId);
    } else {
      // Otherwise decrease quantity
      const updatedCart = currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      set({
        cart: updatedCart,
        totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      });
    }
  },

  // Clear Cart
  clearCart: () => {
    set({
      cart: [],
      totalItems: 0,
      totalPrice: 0,
    });
  },
}));

export default useCartStore;
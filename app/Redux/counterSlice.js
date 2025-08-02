import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  cart: [], // New cart array
  user: null, // null when logged out, object when logged in
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Existing counter logic
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },

    // Add to Cart logic
    addToCart(state, action) {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove from Cart logic
    removeFromCart(state, action) {
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1;
        } else {
          state.cart.splice(index, 1);
        }
      }
    },

    login(state, action) {
      state.user = action.payload; // e.g., { name, email, token }
    },
    logout(state) {
      state.user = null;
    },

     checkout(state) {
      state.cart = [];
    },

  },
});

// Export actions
export const { increment, decrement, addToCart, removeFromCart, login, logout, checkout } = counterSlice.actions;
export default counterSlice.reducer;

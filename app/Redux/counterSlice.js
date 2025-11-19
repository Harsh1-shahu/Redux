import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage on initialization
const getStoredUser = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  }
  return null;
};

const getStoredOrders = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('orders');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Failed to parse orders from localStorage:", err);
      return [];
    }
  }
  return [];
};

const initialState = {
  value: 0,
  cart: [],
  user: {
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
    ...(getStoredUser() || {})
  },
  orders: getStoredOrders(),
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },

    addToCart(state, action) {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

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
      state.user = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },

    logout(state) {
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },

    setUserData(state, action) {
      const { name, email, phone, address } = action.payload;
      state.user = {
        ...state.user,
        name,
        email,
        phone,
        address,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },

    checkout: (state, action) => {
      const timestamp = Date.now();

      const newOrder = {
        id: `${timestamp}`,
        items: state.cart.map((item, index) => ({
          ...item,
          uid: `${item.id}-${timestamp}-${index}`,
        })),
        date: new Date().toISOString(),
        total: state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        paymentMethod: action.payload?.paymentMethod || 'Unknown',
        deliveryStatus: 'Pending',

        // ✅ Add delivery address (fallback to user's address)
        address: action.payload?.address || state.user.address || 'N/A',
      };

      state.orders.push(newOrder);
      state.cart = [];

      if (typeof window !== 'undefined') {
        localStorage.setItem('orders', JSON.stringify(state.orders));
      }
    },


    updateDeliveryStatus(state, action) {
      const { orderId, status } = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order) {
        order.deliveryStatus = status;
        if (typeof window !== 'undefined') {
          localStorage.setItem('orders', JSON.stringify(state.orders));
        }
      }
    },

    updateProfilePicture(state, action) {
      if (state.user) {
        state.user.profilePicture = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },
  },
});

export const {
  increment,
  decrement,
  addToCart,
  removeFromCart,
  login,
  logout,
  checkout,
  updateProfilePicture,
  setUserData,
  updateDeliveryStatus,
} = counterSlice.actions;

export default counterSlice.reducer;

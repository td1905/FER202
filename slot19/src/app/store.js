import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import studentsReducer from '../features/students/studentsSlice';
import counterReducer from '../redux/counterReducer';
import todosReducer from '../redux/bai2/reducers/todosReducer';
import filterReducer from '../redux/bai2/reducers/filterReducer';
import userReducer from '../redux/bai3/userReducer';

// Đọc giỏ hàng đã lưu từ localStorage
function loadCart() {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? { items: JSON.parse(saved) } : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    filter: filterReducer,
    users: userReducer,
    cart: cartReducer,
    products: productsReducer,
    students: studentsReducer,
  },
  preloadedState: {
    cart: loadCart() ?? { items: [] },
  },
});

// Ghi giỏ hàng mỗi khi state thay đổi
store.subscribe(() => {
  try {
    const state = store.getState();
    if (state.cart) {
      localStorage.setItem('cart', JSON.stringify(state.cart.items));
    }
  } catch (err) {
    console.error('Lỗi khi lưu giỏ hàng vào localStorage:', err);
  }
});

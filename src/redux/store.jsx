import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { getTotals } from './cartSlice';
import thunk from "redux-thunk";


const preloadedState = {
  cart: {
    cartItems: localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  }
}

const middleware = [thunk];


export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

store.dispatch(getTotals());

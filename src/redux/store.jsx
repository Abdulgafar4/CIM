import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { getTotals } from './cartSlice';
import purchaseReducer, { getTotal } from './purchaseSlice';
import thunk from "redux-thunk";


const preloadedState = {
  cart: {
    cartItems: localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  },
  purchaseCart: {
    purchaseCartItems: localStorage.getItem('purchaseCartItems') 
    ? JSON.parse(localStorage.getItem('purchaseCartItems'))
    : []
  }
}

const middleware = [thunk];


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    purchaseCart: purchaseReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

store.dispatch(getTotals());
store.dispatch(getTotal());

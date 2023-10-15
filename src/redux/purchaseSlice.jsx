import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  purchaseCartItems: [],
  purchaseCartTotalQuantity: 0,
  purchaseCartTotalAmount: 0,
};



const purchaseCartSlice = createSlice({
  name: 'purchaseCart',
  initialState,
  reducers: {
    addToPurchaseCart(state, action) {
        let tempProductItem = { ...action.payload };
        state.purchaseCartItems.push(tempProductItem);
      localStorage.setItem("purchaseCartItems", JSON.stringify(state.purchaseCartItems));
    },
    decreaseAmount(state, action) {
      const itemIndex = state.purchaseCartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.purchaseCartItems[itemIndex].purchaseCartQuantity > 1) {
        state.purchaseCartItems[itemIndex].purchaseCartQuantity -= 1;
      } else if (state.purchaseCartItems[itemIndex].purchaseCartQuantity === 1) {
        const nextPurchaseCartItems = state.purchaseCartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.purchaseCartItems = nextPurchaseCartItems;
      }
      localStorage.setItem("purchaseCartItems", JSON.stringify(state.purchaseCartItems));
    },
    removeFromPurchaseCart(state, action) {
      state.purchaseCartItems.map((purchaseCartItem) => {
        if (purchaseCartItem.id === action.payload.id) {
          const nextpurchaseCartItems = state.purchaseCartItems.filter(
            (item) => item.id !== purchaseCartItem.id
          );
          state.purchaseCartItems = nextpurchaseCartItems;
        }
        localStorage.setItem("purchaseCartItems", JSON.stringify(state.purchaseCartItems));
        return state;
      });
    },
    clearPurchaseCart(state) {
      state.purchaseCartItems = [];
      localStorage.setItem("purchaseCartItems", JSON.stringify(state.purchaseCartItems));
    },

    getTotal(state) {
      let { total, quantity } = state.purchaseCartItems.reduce(
        (purchaseCartTotal, purchaseCartItem) => {
          const { price, purchaseCartQuantity } = purchaseCartItem;
          const itemTotal = price * purchaseCartQuantity;

          purchaseCartTotal.total += itemTotal;
          purchaseCartTotal.quantity += purchaseCartQuantity;

          return purchaseCartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.purchaseCartTotalQuantity = quantity;
      state.purchaseCartTotalAmount = total;
    },

  }
});

export const { addToPurchaseCart, decreaseAmount, removeFromPurchaseCart, clearPurchaseCart, getTotal } = purchaseCartSlice.actions;

export default purchaseCartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  startTicketPurchase,
  getUserCart,
  updateCartItem,
  removeCartItem,
  placeOrder,
} from "./addtocartAPI";

export const createPurchase = createAsyncThunk(
  "cart/createPurchase",
  async (purchaseData, { rejectWithValue }) => {
    try {
      const data = await startTicketPurchase(purchaseData);
      return data.purchase;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserCart();
      return data.carts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ itemId, updateData }, { rejectWithValue }) => {
    try {
      const data = await updateCartItem(itemId, updateData);
      return data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (itemId, { rejectWithValue }) => {
    try {
      await removeCartItem(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const placeOrders = createAsyncThunk(
  "cart/placeOrder",
  async (purchaseId, { rejectWithValue }) => {
    try {
      const data = await placeOrder(purchaseId);
      return data.paymentRequest;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const initialState = {
  carts: [],
  loading: false,
  error: null,
  paymentRequest: null, // to hold PayU payment info temporarily
  cartItems: {
    dubaiQty: 0,
    thailandQty: 0,
    goldenWinnerQty: 0,
    giftQty: 0,
    dubaiPrice: 0,
    thailandPrice: 0,
    goldenWinnerPrice: 0,
    giftPrice: 0,
  }
};


const addtocartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setDubaiQtys(state, action) {
      state.cartItems.dubaiQty = action.payload;
    },
    setThailandQtys(state, action) {
      state.cartItems.thailandQty = action.payload;
    },
    setGoldenWinnerQtys(state, action) {
      state.cartItems.goldenWinnerQty = action.payload;
    },
    setGiftQtys(state, action) {
      state.cartItems.giftQty = action.payload;
    },

    setDubaiPrices(state, action) {
      state.cartItems.dubaiPrice = action.payload;
    },
    setThailandPrices(state, action) {
      state.cartItems.thailandPrice = action.payload;
    },
    setGoldenWinnerPrices(state, action) {
      state.cartItems.goldenWinnerPrice = action.payload;
    },
    setGiftPrices(state, action) {
      state.cartItems.giftPrice = action.payload;
    },

    clearCartItems(state) {
      state.cartItems = {
        dubaiQty: 0,
        thailandQty: 0,
        goldenWinnerQty: 0,
        giftQty: 0,
        dubaiPrice: 0,
        thailandPrice: 0,
        goldenWinnerPrice: 0,
        giftPrice: 0,
      };
    }
  },
 extraReducers: (builder) => {
  builder
    .addCase(createPurchase.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createPurchase.fulfilled, (state, action) => {
      state.loading = false;
      state.carts.push(action.payload);
    })
    .addCase(createPurchase.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = action.payload;
    })
    .addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(updateCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateCart.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.carts.findIndex(c => c._id === action.payload._id);
      if (index !== -1) state.carts[index] = action.payload;
    })
    .addCase(updateCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(removeItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(removeItem.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = state.carts.filter(c => c._id !== action.payload);
    })
    .addCase(removeItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // New placeOrder handler to get PayU paymentRequest
    .addCase(placeOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(placeOrders.fulfilled, (state, action) => {
      state.loading = false;
      // Store paymentRequest temporarily in state if needed
      // Or handle redirect in frontend directly after thunk resolved
      state.paymentRequest = action.payload;
    })
    .addCase(placeOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}

});

 

export const {
  setDubaiQtys,
  setThailandQtys,
  setGoldenWinnerQtys,
  setGiftQtys,
  clearCartItems,
  setDubaiPrices,
  setThailandPrices,
  setGoldenWinnerPrices,
  setGiftPrices,
} = addtocartSlice.actions;

export default addtocartSlice.reducer;

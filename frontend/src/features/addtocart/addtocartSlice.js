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
      return rejectWithValue(error.response.data.message || error.message);
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
      return rejectWithValue(error.response.data.message || error.message);
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
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const data = await removeCartItem(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const confirmOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (cartId, { rejectWithValue }) => {
    try {
      const data = await placeOrder(cartId);
      return data.cart;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const addtocartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    loading: false,
    error: null,
  },
  reducers: {},
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

      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.carts.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.carts[index] = action.payload;
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addtocartSlice.reducer;


// export const { clearError } = authSlice.actions;


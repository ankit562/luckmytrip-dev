import {configureStore} from "@reduxjs/toolkit"
import authReducer from '../features/auth/authUserSlice'
import ticketReducer from '../features/tickets/ticketSlice';
import productReducer from '../features/products/productSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    products : productReducer,
    
  },
});
export default store;
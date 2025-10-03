import {configureStore} from "@reduxjs/toolkit"
import authReducer from '../features/auth/authUserSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    // any other reducers
  },
});
export default store;
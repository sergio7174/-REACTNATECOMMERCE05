import { configureStore } from '@reduxjs/toolkit';
import addCartToReducer from './addCartToReducer';
import rootReducer from './rootReducer';
import userDetails from './userReducer';
import historyReducer from './historyReducer';
import productPreviewReducer from './productPreviewReducer';
export const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
    addCartToReducer: addCartToReducer,
    userReducer: userDetails,
    historyReducer: historyReducer,
    productPreviewReducer
  },
})
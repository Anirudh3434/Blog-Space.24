import { configureStore } from '@reduxjs/toolkit';
import authReducer from './StoreSlice';

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
   
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState().auth);
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        user: {},
        status: 'idle',
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      user: null,
      status: 'idle',
    };
  }
};

const initialState = loadState();

const storeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state, action) {
      state.user = action.payload;
      state.status = 'logged_in';
    },
    logOut(state) {
      state.user = null;
      state.status = 'logged_out';
    },
  },
});

export const { logIn, logOut } = storeSlice.actions;
export default storeSlice.reducer;

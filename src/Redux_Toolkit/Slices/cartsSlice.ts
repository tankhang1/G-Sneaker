import {createSlice} from '@reduxjs/toolkit';
export interface SHOE {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  color: string;
}
export interface CART {
  shoe: SHOE;
  quantity: number;
}

const initialState: CART[] = [];

export const cartsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.push(action.payload);
    },
    increaseShoe: (state, action) => {
      let indexShoe = state.findIndex(
        shoe => shoe.shoe.id === action.payload.id,
      );
      if (indexShoe > -1) {
        state[indexShoe].quantity += 1;
      }
      return state;
    },
    descreaseShoe: (state, action) => {
      let indexShoe = state.findIndex(
        shoe => shoe.shoe.id === action.payload.id,
      );
      if (indexShoe > -1 && state[indexShoe].quantity > 0) {
        if (state[indexShoe].quantity === 1) state.splice(indexShoe, 1);
        else state[indexShoe].quantity -= 1;
      }

      return state;
    },
    deleteShoe: (state, action) => {
      let indexShoe = state.findIndex(
        shoe => shoe.shoe.id === action.payload.id,
      );
      if (indexShoe > -1) state.splice(indexShoe, 1);
      return state;
    },
  },
});

export const {addCart, increaseShoe, descreaseShoe, deleteShoe} =
  cartsSlice.actions;

export default cartsSlice.reducer;

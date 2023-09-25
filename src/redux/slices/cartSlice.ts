import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { count } from "console";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPriceR } from "../../utils/calcTotalPrice";

export type CartItem = {
  id:string;
  title:string;
  price:number;
  imageUrl:string;
  type: string;
  size: number ;
  count: number
}
interface CartSliceState{
  totalPrice:number;
  items: CartItem[]
} 
const {items,totalPrice} = getCartFromLS()

 const initialState:CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPriceR(state.items)
      // ======
      /* state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0); */
      // =====
    },
    
    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 0) {
        findItem.count--;
        if (findItem.count < 1) {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        }
      }
      state.totalPrice = calcTotalPriceR(state.items)
      // ======
    /*   state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0); */
      // ======
    },

    removeItem(state, action:PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);      
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;      
    },
  },
});

export const selectCart = (state:RootState) => state.cart;
export const selectCartItemById = (id: string) => (state:RootState) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
function calcTotalPrice(items: import("immer/dist/internal").WritableDraft<CartItem>[]): number {
  throw new Error("Function not implemented.");
}


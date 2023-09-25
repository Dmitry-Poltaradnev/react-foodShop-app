import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPriceR = (items: CartItem[]) => {
   return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
} 
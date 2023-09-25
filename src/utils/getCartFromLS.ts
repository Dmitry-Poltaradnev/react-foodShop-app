import { calcTotalPriceR } from "./calcTotalPrice";

export const getCartFromLS = () => {
 const data = localStorage.getItem('cart')
 const items = data ? JSON.parse(data) : []
 const totalPrice = calcTotalPriceR(items) 
   return{
    items,
    totalPrice
   }
}
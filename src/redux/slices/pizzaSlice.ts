import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type FetchPizzasArgs = Record<string, string>

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus",
  async (params:FetchPizzasArgs) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://645a6a4a95624ceb210148ff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data 
  }
);

  type Pizza ={
    id:string,
    title:string,
    price:number,
    imageUrl:string,
    sizes:number[],
    types:number[]
  }

  export enum Status  {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
  }
  interface PizzaSliceState {
    items: Pizza[];
    status: Status
  }

const initialState:PizzaSliceState = {
  items: [],
  status: Status.LOADING, //Loading | Success | Error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
        console.log("Идёт запрос");
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
        console.log("Запрос удачен");
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
        console.log("Ошибка запроса");
      });
  },
});
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

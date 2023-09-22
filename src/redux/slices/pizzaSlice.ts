import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus",
  async (params) => {
    // console.log(thunkAPI);
  // @ts-ignore
    const { order, sortBy, category, search, currentPage } = params;

    const { data } = await axios.get(
      `https://645a6a4a95624ceb210148ff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
const initialState = {
  items: [],
  status: "loading", //Loading | Success | Error
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
        state.status = "loading";
        state.items = [];
        console.log("Идёт запрос");
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
        console.log("Запрос удачен");
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
        console.log("Ошибка запроса");
      });
  },
});
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

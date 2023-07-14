import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: { name: "популярности", sortProperty: "rating" },
};

const filterSlice = createSlice({
<<<<<<< HEAD
 name: 'filters',
 initialState,
 reducers: {
    setCategoryId(state, action){
      state.categoryId += action.payload
    }
 }
})
 export const {setCategoryId} = filterSlice.actions
 export default filterSlice.reducer
=======
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      console.log(action);
      state.categoryId = action.payload;
    },
  },
});
export const { setCategoryId } = filterSlice.actions;
export default filterSlice.reducer;
>>>>>>> add_new_reduxLogic

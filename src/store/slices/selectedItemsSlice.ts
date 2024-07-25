import { createSlice } from "@reduxjs/toolkit";

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState: [] as string[],
  reducers: {
    toggleItem: (state, action) => {
      const itemName: string = action.payload;
      if (state.includes(itemName)) {
        return state.filter((item) => item !== itemName);
      } else {
        return [...state, itemName];
      }
    },
    clearSelectedItems: () => [],
  },
});

export const { toggleItem, clearSelectedItems } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;

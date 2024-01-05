import { createSlice } from "@reduxjs/toolkit";

const careModeSlice = createSlice({
  name: "careModeSlice",
  initialState: {
    listCareMode: [],
    careMode: {},
  },
  reducers: {
    setListCareMode: (state, action) => {
        state.listCareMode = action.payload;
    },
    setCareMode: (state, action) => {
        state.careMode = action.payload;
    },
    fetchCareModeTrigger: () => {},
    fetchListCareModeTrigger: () => {},
    createCareModeTrigger:() =>{},
    updateCareModeTrigger: () => {},
    deleteCareModeTrigger:() =>{}
  },
});

export const {
    setListCareMode,
    setCareMode,
    fetchListCareModeTrigger,
    fetchCareModeTrigger,
    createCareModeTrigger,
    updateCareModeTrigger,
    deleteCareModeTrigger
} = careModeSlice.actions;
export default careModeSlice.reducer;

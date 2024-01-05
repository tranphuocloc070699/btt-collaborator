import { createSlice } from "@reduxjs/toolkit";

const collaborativeContentSlice = createSlice({
  name: "collaborativeContentSlice",
  initialState: {
    listCollaborativeContent: [],
    collaborativeContent: {},
  },
  reducers: {
    setListCollaborativeContent: (state, action) => {
        state.listCollaborativeContent = action.payload;
    },
    setCollaborativeContent: (state, action) => {
        state.collaborativeContent = action.payload;
    },
    fetchCollaborativeContentTrigger: () => {},
    fetchListCollaborativeContentTrigger: () => {},
    createCollaborativeContentTrigger:() =>{},
    updateCollaborativeContentTrigger: () => {},
    deleteCollaborativeContentTrigger:() =>{}
  },
});

export const {
    setListCollaborativeContent,
    setCollaborativeContent,
    fetchListCollaborativeContentTrigger,
    fetchCollaborativeContentTrigger,
    createCollaborativeContentTrigger,
    updateCollaborativeContentTrigger,
    deleteCollaborativeContentTrigger
} = collaborativeContentSlice.actions;
export default collaborativeContentSlice.reducer;

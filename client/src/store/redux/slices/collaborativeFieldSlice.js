import { createSlice } from "@reduxjs/toolkit";

const collaborativeFieldSlice = createSlice({
  name: "collaborativeFieldSlice",
  initialState: {
    listCollaborativeField: [],
    collaborativeField: {},
  },
  reducers: {
    setListCollaborativeField: (state, action) => {
        state.listCollaborativeField = action.payload;
    },
    setCollaborativeField: (state, action) => {
        state.collaborativeField = action.payload;
    },
    fetchCollaborativeFieldTrigger: () => {},
    fetchListCollaborativeFieldTrigger: () => {},
    createCollaborativeFieldTrigger:() =>{},
    updateCollaborativeFieldTrigger: () => {},
    deleteCollaborativeFieldTrigger:() =>{}
  },
});

export const {
    setListCollaborativeField,
    setCollaborativeField,
    fetchListCollaborativeFieldTrigger,
    fetchCollaborativeFieldTrigger,
    createCollaborativeFieldTrigger,
    updateCollaborativeFieldTrigger,
    deleteCollaborativeFieldTrigger
} = collaborativeFieldSlice.actions;
export default collaborativeFieldSlice.reducer;

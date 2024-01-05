import { createSlice } from "@reduxjs/toolkit";

const collaboratorSlice = createSlice({
  name: "collaboratorSlice",
  initialState: {
    listCollaborator: [ ],
    totalItemsOfListCollaborator:0,
    collaborator: {},
    listDepartment:[],
    listPosition:[]
  },
  reducers: {
    setListCollaborator: (state, action) => {
        state.listCollaborator = action.payload;
    },
    setTotalItemsOfListCollaborator: (state, action) => {
        state.totalItemsOfListCollaborator = action.payload;
    },
    setCollaborator: (state, action) => {
        state.collaborator = action.payload;
    },
    setListDepartment: (state, action) => {
        state.listDepartment = action.payload;
    },
    setListPosition: (state, action) => {
        state.listPosition = action.payload;
    },
    fetchCollaboratorTrigger: () => {},
    fetchListCollaboratorTrigger: () => {},
    createCollaboratorTrigger:() =>{},
    updateCollaboratorTrigger: () => {},
    deleteCollaboratorTrigger:() =>{},

    fetchDepartmentListTrigger: () => {},
    fetchPositionListTrigger: () => {},

    pushToCollaborativeFieldTrigger: () => {},
    pushToCollaborativeContentTrigger: () => {},
    pushToCareModeTrigger: () => {},
    removeFromCollaborativeFieldTrigger: () => {},
    removeFromCollaborativeContentTrigger: () => {},
    removeFromCareModeTrigger: () => {},
  },
});

export const {
    setListCollaborator,
    setCollaborator,
    setTotalItemsOfListCollaborator,
    fetchListCollaboratorTrigger,
    fetchCollaboratorTrigger,
    createCollaboratorTrigger,
    updateCollaboratorTrigger,
    deleteCollaboratorTrigger,
    fetchDepartmentListTrigger,
    fetchPositionListTrigger,
    pushToCollaborativeFieldTrigger,
    pushToCollaborativeContentTrigger,
    pushToCareModeTrigger,
    removeFromCollaborativeFieldTrigger,
    removeFromCollaborativeContentTrigger,
    removeFromCareModeTrigger
} = collaboratorSlice.actions;
export default collaboratorSlice.reducer;

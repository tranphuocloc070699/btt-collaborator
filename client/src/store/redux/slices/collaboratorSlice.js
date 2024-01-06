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
    changeItemPropertyListCollaborator: (state,action) =>{
      /* 
      input: {
        id:
        data:{}
      }
      */
      let array = state.listCollaborator.map(item => item);
      let itemIndex = state.listCollaborator.findIndex(item => item.id == action.payload.id);
      if(itemIndex!=-1){
        Object.keys(action.payload.data).forEach((key) =>{
          array[itemIndex][key] = action.payload.data[key];
        })
        
        state.listCollaborator = array
      }
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
    approveCollaboratorTrigger:() =>{},
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
    setListDepartment,
    setListPosition,
    changeItemPropertyListCollaborator,
    setTotalItemsOfListCollaborator,
    fetchListCollaboratorTrigger,
    fetchCollaboratorTrigger,
    createCollaboratorTrigger,
    approveCollaboratorTrigger,
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

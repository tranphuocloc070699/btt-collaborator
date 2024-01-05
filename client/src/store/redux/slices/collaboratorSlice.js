import { createSlice } from "@reduxjs/toolkit";

const collaboratorSlice = createSlice({
  name: "collaboratorSlice",
  initialState: {
    listCollaborator: [
        {
            id:0,
            full_name:'user 1',
            avatar:'',
            gender:'',
            dep_pos:{},
            workplace:'',
            birth_day:'2024-01-01',
            resident:'',
            phone:'',
            email:'',
            facebook:'',
            is_collaborator:false,
            state:'',
            created_at:'2024-01-01',
            updated_at:'2024-01-01',
            deleted_at:'2024-01-01',
        },
        {
            id:1,
            full_name:'user 2',
            avatar:'',
            gender:'',
            dep_pos:{},
            workplace:'',
            birth_day:'2024-01-01',
            resident:'',
            phone:'',
            email:'',
            facebook:'',
            is_collaborator:false,
            state:'',
            created_at:'2024-01-01',
            updated_at:'2024-01-01',
            deleted_at:'2024-01-01',
        },
        {
            id:2,
            full_name:'user 3',
            avatar:'',
            gender:'',
            dep_pos:{},
            workplace:'',
            birth_day:'2024-01-01',
            resident:'',
            phone:'',
            email:'',
            facebook:'',
            is_collaborator:false,
            state:'',
            created_at:'2024-01-01',
            updated_at:'2024-01-01',
            deleted_at:'2024-01-01',
        }
    ],
    collaborator: {
        id:0,
        full_name:'user 1',
        avatar:'',
        gender:'',
        dep_pos:{},
        workplace:'',
        birth_day:'2024-01-01',
        resident:'',
        phone:'',
        email:'',
        facebook:'',
        is_collaborator:false,
        state:'',
        created_at:'2024-01-01',
        updated_at:'2024-01-01',
        deleted_at:'2024-01-01',
    },
    listDepartment:[],
    listPosition:[]
  },
  reducers: {
    setListCollaborator: (state, action) => {
        state.listCollaborator = action.payload;
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

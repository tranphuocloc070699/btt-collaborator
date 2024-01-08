import { createSlice } from "@reduxjs/toolkit"

const uploadSlice = createSlice({
    name: "upload",
    initialState: {
        uploadList: [],
    },
    
    reducers: {
        getUpload: ()=>{},
        emptyUploadTrigger:() => {},
        setUpload: (state,action)=>{
            // state.uploadList = [...state.uploadList, ...action.payload]
            state.uploadList = [...action.payload]
        }
    },
})

export const { 
    getUpload,
    setUpload,
    emptyUploadTrigger
} = uploadSlice.actions
export default uploadSlice.reducer

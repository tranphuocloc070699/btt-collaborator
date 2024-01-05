import { createSlice } from "@reduxjs/toolkit"

const uploadSlice = createSlice({
    name: "upload",
    initialState: {
        uploadList: [],
    },
    
    reducers: {
        getUpload: ()=>{},
        setUpload: (state,action)=>{
            state.uploadList = [...state.uploadList, ...action.payload]
        }
    },
})

export const { 
    getUpload,
    setUpload
} = uploadSlice.actions
export default uploadSlice.reducer

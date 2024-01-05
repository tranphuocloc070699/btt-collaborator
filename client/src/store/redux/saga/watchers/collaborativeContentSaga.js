import { call, fork, put, takeLatest } from "redux-saga/effects"
import { setLoading } from "../../slices/loadingSlice"
import {
    setListCollaborativeContent,
    setCollaborativeContent,
    fetchListCollaborativeContentTrigger,
    fetchCollaborativeContentTrigger,
    createCollaborativeContentTrigger,
    updateCollaborativeContentTrigger,
    deleteCollaborativeContentTrigger
} from "../../slices/collaborativeContentSlice"

import {
    fetchListCollaborativeContent_API,
    fetchCollaborativeContentByID_API,
    createCollaborativeContent_API,
    updateCollaborativeContent_API,
    deleteCollaborativeContent_API
 } from "../../../../api/collaborativeContentAPI"
import { ErrorNotification, SuccessNotification } from "../../../../utils/Notification"
 


function* handleFetchListCollaborativeContent(payload) {
    const result = yield call(fetchListCollaborativeContent_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setAssetDeclarationList(result?.data))
        // yield put(setLoading(true))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleFetchCollaborativeContent(payload){
    const result = yield call(fetchCollaborativeContentByID_API,payload?.data)
    if(result.code === "200"){
        // yield put(setAssetDeclarationByID(result?.data))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}


// Thực hiện các tác nhân được chọ
function* handleCreateCollaborativeContent(payload) {
    const result = yield call(createCollaborativeContent_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setCreateAssetDeclaration(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Kê khai thành công")
    }else{
        ErrorNotification("Kê khai không thành công")
    }
}


function* handleUpdateCollaborativeContent(payload){
    
    const result = yield call(updateCollaborativeContent_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleDeleteCollaborativeContent(payload){
    
    const result = yield call(deleteCollaborativeContent_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}




// Chứa danh sách các action cần thực hiện
function* onHandleRootCollaborativeContent() {

    yield takeLatest(fetchListCollaborativeContentTrigger.type, handleFetchListCollaborativeContent)
    yield takeLatest(fetchCollaborativeContentTrigger.type, handleFetchCollaborativeContent)
    yield takeLatest(createCollaborativeContentTrigger.type, handleCreateCollaborativeContent)
    yield takeLatest(updateCollaborativeContentTrigger.type, handleUpdateCollaborativeContent)
    yield takeLatest(deleteCollaborativeContentTrigger.type, handleDeleteCollaborativeContent)
}

export const collaborativeContentSaga = [fork(onHandleRootCollaborativeContent)]

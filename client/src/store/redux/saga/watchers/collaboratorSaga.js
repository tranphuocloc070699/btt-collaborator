import { call, fork, put, takeLatest } from "redux-saga/effects"
import { setLoading } from "../../slices/loadingSlice"
import {
    setListCollaborator,
    setCollaborator,
    fetchListCollaboratorTrigger,
    fetchCollaboratorTrigger,
    createCollaboratorTrigger,
    updateCollaboratorTrigger,
    deleteCollaboratorTrigger
} from "../../slices/collaboratorSlice"

import {
    fetchListCollaborator_API,
    fetchCollaboratorByID_API,
    createCollaborator_API,
    updateCollaborator_API,
    deleteCollaborator_API
 } from "../../../../api/collaboratorAPI"
import { ErrorNotification, SuccessNotification } from "../../../../utils/Notification"
 


function* handleFetchListCollaborator(payload) {
    const result = yield call(fetchListCollaborator_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setAssetDeclarationList(result?.data))
        // yield put(setLoading(true))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleFetchCollaborator(payload){
    const result = yield call(fetchCollaboratorByID_API,payload?.data)
    if(result.code === "200"){
        // yield put(setAssetDeclarationByID(result?.data))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}


// Thực hiện các tác nhân được chọ
function* handleCreateCollaborator(payload) {
    const result = yield call(createCollaborator_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setCreateAssetDeclaration(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Kê khai thành công")
    }else{
        ErrorNotification("Kê khai không thành công")
    }
}


function* handleUpdateCollaborator(payload){
    
    const result = yield call(updateCollaborator_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleDeleteCollaborator(payload){
    
    const result = yield call(deleteCollaborator_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}




// Chứa danh sách các action cần thực hiện
function* onHandleRootCollaborator() {

    yield takeLatest(fetchListCollaboratorTrigger.type, handleFetchListCollaborator)
    yield takeLatest(fetchCollaboratorTrigger.type, handleFetchCollaborator)
    yield takeLatest(createCollaboratorTrigger.type, handleCreateCollaborator)
    yield takeLatest(updateCollaboratorTrigger.type, handleUpdateCollaborator)
    yield takeLatest(deleteCollaboratorTrigger.type, handleDeleteCollaborator)
}

export const collaboratorSaga = [fork(onHandleRootCollaborator)]

import { call, fork, put, takeLatest } from "redux-saga/effects"
import { setLoading } from "../../slices/loadingSlice"
import {
    setListCollaborativeField,
    setCollaborativeField,
    fetchListCollaborativeFieldTrigger,
    fetchCollaborativeFieldTrigger,
    createCollaborativeFieldTrigger,
    updateCollaborativeFieldTrigger,
    deleteCollaborativeFieldTrigger
} from "../../slices/collaborativeFieldSlice"

import {
    fetchListCollaborativeField_API,
    fetchCollaborativeFieldByID_API,
    createCollaborativeField_API,
    updateCollaborativeField_API,
    deleteCollaborativeField_API
 } from "../../../../api/collaborativeFieldAPI"
import { ErrorNotification, SuccessNotification } from "../../../../utils/Notification"
 


function* handleFetchListCollaborativeField(payload) {
    const result = yield call(fetchListCollaborativeField_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setAssetDeclarationList(result?.data))
        // yield put(setLoading(true))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleFetchCollaborativeField(payload){
    const result = yield call(fetchCollaborativeFieldByID_API,payload?.data)
    if(result.code === "200"){
        // yield put(setAssetDeclarationByID(result?.data))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}


// Thực hiện các tác nhân được chọ
function* handleCreateCollaborativeField(payload) {
    const result = yield call(createCollaborativeField_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setCreateAssetDeclaration(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Kê khai thành công")
    }else{
        ErrorNotification("Kê khai không thành công")
    }
}


function* handleUpdateCollaborativeField(payload){
    
    const result = yield call(updateCollaborativeField_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleDeleteCollaborativeField(payload){
    
    const result = yield call(deleteCollaborativeField_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}




// Chứa danh sách các action cần thực hiện
function* onHandleRootCollaborativeField() {

    yield takeLatest(fetchListCollaborativeFieldTrigger.type, handleFetchListCollaborativeField)
    yield takeLatest(fetchCollaborativeFieldTrigger.type, handleFetchCollaborativeField)
    yield takeLatest(createCollaborativeFieldTrigger.type, handleCreateCollaborativeField)
    yield takeLatest(updateCollaborativeFieldTrigger.type, handleUpdateCollaborativeField)
    yield takeLatest(deleteCollaborativeFieldTrigger.type, handleDeleteCollaborativeField)
}

export const collaborativeFieldSaga = [fork(onHandleRootCollaborativeField)]

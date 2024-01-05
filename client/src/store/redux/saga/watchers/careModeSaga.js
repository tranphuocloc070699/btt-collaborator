import { call, fork, put, takeLatest } from "redux-saga/effects"
import { setLoading } from "../../slices/loadingSlice"
import {
    setListCareMode,
    setCareMode,
    fetchListCareModeTrigger,
    fetchCareModeTrigger,
    createCareModeTrigger,
    updateCareModeTrigger,
    deleteCareModeTrigger
} from "../../slices/careModeSlice"

import {
    fetchListCareMode_API,
    fetchCareModeByID_API,
    createCareMode_API,
    updateCareMode_API,
    deleteCareMode_API
 } from "../../../../api/careModeAPI"
import { ErrorNotification, SuccessNotification } from "../../../../utils/Notification"
 


function* handleFetchListCareMode(payload) {
    const result = yield call(fetchListCareMode_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setAssetDeclarationList(result?.data))
        // yield put(setLoading(true))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleFetchCareMode(payload){
    const result = yield call(fetchCareModeByID_API,payload?.data)
    if(result.code === "200"){
        // yield put(setAssetDeclarationByID(result?.data))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}


// Thực hiện các tác nhân được chọ
function* handleCreateCareMode(payload) {
    const result = yield call(createCareMode_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setCreateAssetDeclaration(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Kê khai thành công")
    }else{
        ErrorNotification("Kê khai không thành công")
    }
}


function* handleUpdateCareMode(payload){
    
    const result = yield call(updateCareMode_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleDeleteCareMode(payload){
    
    const result = yield call(deleteCareMode_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}




// Chứa danh sách các action cần thực hiện
function* onHandleRootCareMode() {

    yield takeLatest(fetchListCareModeTrigger.type, handleFetchListCareMode)
    yield takeLatest(fetchCareModeTrigger.type, handleFetchCareMode)
    yield takeLatest(createCareModeTrigger.type, handleCreateCareMode)
    yield takeLatest(updateCareModeTrigger.type, handleUpdateCareMode)
    yield takeLatest(deleteCareModeTrigger.type, handleDeleteCareMode)
}

export const careModeSaga = [fork(onHandleRootCareMode)]

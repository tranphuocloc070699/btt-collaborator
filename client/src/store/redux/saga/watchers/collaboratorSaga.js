import { call, fork, put, takeLatest } from "redux-saga/effects"
import { setLoading } from "../../slices/loadingSlice"
import {
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
} from "../../slices/collaboratorSlice"

import {
    fetchListCollaborator_API,
    fetchCollaboratorByID_API,
    createCollaborator_API,
    updateCollaborator_API,
    deleteCollaborator_API,
    fetchDepartmentList_API,
    fetchPositionlist_API,
    pushToCollaborativeField_API,
    pushToCollaborativeContent_API,
    pushToCareMode_API,
    removeFromCollaborativeField_API,
    removeFromCollaborativeContent_API,
    removeFromCareMode_API
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

function* handleFetchListDepartment(payload) {
    const result = yield call(fetchDepartmentList_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setAssetDeclarationList(result?.data))
        // yield put(setLoading(true))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleFetchListPosition(payload) {
    const result = yield call(fetchPositionlist_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setAssetDeclarationList(result?.data))
        // yield put(setLoading(true))
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handlePushToCollaborativeField(payload) {
    const result = yield call(pushToCollaborativeField_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setCreateAssetDeclaration(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Kê khai thành công")
    }else{
        ErrorNotification("Kê khai không thành công")
    }
}

function* handlePushToCollaborativeContent(payload) {
    const result = yield call(pushToCollaborativeContent_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setCreateAssetDeclaration(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Kê khai thành công")
    }else{
        ErrorNotification("Kê khai không thành công")
    }
}

function* handlePushToCareMode(payload) {
    const result = yield call(pushToCareMode_API,payload?.data)
    if(result?.code === "200"){
        // yield put(setCreateAssetDeclaration(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Kê khai thành công")
    }else{
        ErrorNotification("Kê khai không thành công")
    }
}

function* handleRemoveFromCollaborativeField(payload){
    
    const result = yield call(removeFromCollaborativeField_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleRemoveFromCollaborativeContent(payload){
    
    const result = yield call(removeFromCollaborativeContent_API,payload?.data)
    if(result.code === "200"){
        // yield put(setUpdateAssetDeclarationByID(result?.data))
        // yield put(setLoading(true))
        // SuccessNotification("Đã cập nhật kê khai")
    }else{
        ErrorNotification("Không lấy được dữ liệu")
    }
}

function* handleRemoveFromCareMode(payload){
    
    const result = yield call(removeFromCareMode_API,payload?.data)
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
    yield takeLatest(fetchDepartmentListTrigger.type, handleFetchListDepartment)
    yield takeLatest(fetchPositionListTrigger.type, handleFetchListPosition)
    yield takeLatest(pushToCollaborativeFieldTrigger.type, handlePushToCollaborativeField)
    yield takeLatest(pushToCollaborativeContentTrigger.type, handlePushToCollaborativeContent)
    yield takeLatest(pushToCareModeTrigger.type, handlePushToCareMode)
    yield takeLatest(removeFromCollaborativeFieldTrigger.type, handleRemoveFromCollaborativeField)
    yield takeLatest(removeFromCollaborativeContentTrigger.type, handleRemoveFromCollaborativeContent)
    yield takeLatest(removeFromCareModeTrigger.type, handleRemoveFromCareMode)
}

export const collaboratorSaga = [fork(onHandleRootCollaborator)]

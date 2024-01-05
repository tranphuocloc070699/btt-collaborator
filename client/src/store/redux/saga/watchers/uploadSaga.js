import { call, fork, put, takeLatest } from "redux-saga/effects"
import { getUpload, setUpload } from "../../slices/uploadSlice"
import { getUploadAPI } from "../../../../api/uploadAPI";
import { ErrorNotification, SuccessNotification } from "../../../../utils/Notification";


function* handleGetUpload(payload) {
    const result = yield call(getUploadAPI, payload?.data)
    if(result.code === "200"){
        yield put(setUpload(result?.data.files))
    }else{
        ErrorNotification("Upload thất bại")
    }
}

function* onHandleRootUpload() {

    yield takeLatest(getUpload.type, handleGetUpload)
}

export const uploadSaga = [fork(onHandleRootUpload)]

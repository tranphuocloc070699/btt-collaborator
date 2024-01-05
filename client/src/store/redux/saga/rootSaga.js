import { all } from "redux-saga/effects"
import { collaborativeFieldSaga } from './watchers/collaborativeFieldSaga'
import { collaborativeContentSaga } from './watchers/collaborativeContentSaga'
import { collaboratorSaga } from './watchers/collaboratorSaga'
import { careModeSaga } from './watchers/careModeSaga'
import { uploadSaga } from "./watchers/uploadSaga"
export default function* rootSaga(){
    yield all([
        ...collaborativeFieldSaga,
        ...collaborativeContentSaga,
        ...careModeSaga,
        ...uploadSaga,
        ...collaboratorSaga
    ])
}
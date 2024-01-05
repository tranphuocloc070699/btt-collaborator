import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/saga/rootSaga";
import collaborativeFieldSlice from './redux/slices/collaborativeFieldSlice';
import collaborativeContentSlice from './redux/slices/collaborativeContentSlice';
import careModeSlice from './redux/slices/careModeSlice';
import loadingSlice from "./redux/slices/loadingSlice";
import uploadSlice from "./redux/slices/uploadSlice";
import collaboratorSlice from "./redux/slices/collaboratorSlice";
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// dmdm

// config store the saga middleware
const store = configureStore({
    reducer:{
        // actions: actionReducer
        collaborativeField:collaborativeFieldSlice,
        collaborativeContent:collaborativeContentSlice,
        careMode:careModeSlice,
        loading: loadingSlice,
        upload: uploadSlice,
        collaborator:collaboratorSlice,
    },
    middleware: [sagaMiddleware]
})

// use the saga middelware
sagaMiddleware.run(rootSaga)

export default store




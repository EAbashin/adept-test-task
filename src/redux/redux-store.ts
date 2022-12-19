import {combineReducers, legacy_createStore as createStore} from "redux";
import {devToolsEnhancer} from "@redux-devtools/extension";
import mainReducer from "./reducers/mainReducer";

const rootReducer = combineReducers({
    main: mainReducer
});

type RootReducerType = typeof rootReducer;
export type StateType = ReturnType<RootReducerType>;

const store = createStore(rootReducer, devToolsEnhancer());

export default store;

import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux"
import authReducer from "../auth-reducer";
import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import chatReducer from "./chatRecucer"
import usersReducer from "./usersReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import appReducer from "../app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
});

type ReducersType = typeof reducers;

export type AppStateType = ReturnType<ReducersType> // помещает в АппСтейт результат заретурненой функции  РедусерсТайп
export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)));

//@ts-ignore
window.__store__ = store;

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
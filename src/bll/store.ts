import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { AuthAT, authReducer } from './reducer/auth-reducer';

const rootReducer = combineReducers({
    auth: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionsType>

export type AppActionsType = AuthAT

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
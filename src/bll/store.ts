import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { AppAT, appReducer } from './reducer/app-reducer';
import { AuthAT, authReducer } from './reducer/auth-reducer/auth-reducer';
import { RestorePasswordActionType, restorePasswordReducer } from './reducer/auth-reducer/recovery-password-reducer';
import { RegisterUserActionType, registrationReducer } from './reducer/auth-reducer/registration-reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    registr: registrationReducer,
    app: appReducer,
    restorePassword : restorePasswordReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionsType>

export type AppActionsType = AuthAT | RegisterUserActionType | AppAT | RestorePasswordActionType

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
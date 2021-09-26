import { authAPI } from "../../dal/api-cards";
import { AppActionsType, AppThunk } from "../store";
import { RequestStatusType, setIsLoggedIn } from "./auth-reducer/auth-reducer";


type InitialStateType = typeof initialState;
const initialState = {
    satus: 'idle' as RequestStatusType,
    error: null as string | null,
    userData: {
        _id: '',
        email: '',
        name: '',
        avatar: '' as string | undefined,
        publicCardPacksCount: 0,

        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,
    } as UserDataType
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): any => {
    switch (action.type) {
        case 'app/SET-APP-STATUS':
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}
//action
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'app/SET-APP-STATUS', status } as const);

//thunk
export const initializetApp = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        const res = await authAPI.me()
        if (res.data._id) {
            dispatch(setIsLoggedIn(true))
        }
        dispatch(setAppStatusAC('succeeded'));
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (`AuthMe failed: ${e.message}.`)
        console.log(error)
        dispatch(setAppStatusAC("failed"))
    }
};


export type AppAT = ReturnType<typeof setAppStatusAC>


export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar: string | undefined
    publicCardPacksCount: number

    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean

    error?: string
}
import { AppActionsType } from "../store";
import { RequestStatusType } from "./auth-reducer/auth-reducer";


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
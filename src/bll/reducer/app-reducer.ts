import { AppActionsType } from "../store";
import { RequestStatusType } from "./auth-reducer/auth-reducer";


type InitialStateType = typeof initialState;
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    headerMenuStatus: "packsList" as HeaderMenuStatusType,
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


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-APP-STATUS':
            return {
                ...state,
                status: action.status,
            }
        case 'app/SET-HEADER-MENU-STATUS':
            return {
                ...state,
                headerMenuStatus: action.headerMenuStatus,
            }
        case 'app/SET-USER-DATA':
            return {
                ...state,
                userData: action.userData,
            }
        case 'app/SET-ERROR':
            return {
                ...state,
                error: action.error,
            }
        default:
            return state
    }
}
//action
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'app/SET-APP-STATUS', status } as const);
export const setHeaderMenuStatus = (headerMenuStatus: HeaderMenuStatusType) => ({type: 'app/SET-HEADER-MENU-STATUS', headerMenuStatus} as const);
export const setUserData = (userData: UserDataType) => ({type: 'app/SET-USER-DATA', userData} as const);
export const setAppError = (error: string | null) => ({type: 'app/SET-ERROR', error} as const);


export type AppAT = ReturnType<typeof setAppStatusAC> 
                    | ReturnType<typeof setHeaderMenuStatus>
                    | ReturnType<typeof setUserData>
                    | ReturnType<typeof setAppError>

export type HeaderMenuStatusType = "packsList" | "profile"


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
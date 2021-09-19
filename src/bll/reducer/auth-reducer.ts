import { authAPI } from "../../dal/api-cards";
import { AppActionsType, AppThunk } from "../store";

export type ProfileResponseType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
};
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = typeof initialState;

const initialState = {
    profile: {
        avatar: '',
        created: '',
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        updated: '',
        verified: false,
        __v: 0,
        _id: ''
    } || null,
    isLoggedIn: false,
    isInitialized: false,
    status: 'idle' as RequestStatusType
};


export const authReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-PROFILE':
            return {...state, profile: action.profile}
        case 'auth/SET-APP-STATUS':
            return {
                ...state, status: action.status
            }
        default:
            return state
    }
};

export const initializedProfileAC = (profile: ProfileResponseType) =>
    ({ type: 'auth/SET-PROFILE', profile } as const);
export  const setAppStatusAC = (status: RequestStatusType) => ({type: 'auth/SET-APP-STATUS', status} as const);

export type AuthAT = ReturnType<typeof initializedProfileAC>
                    | ReturnType<typeof setAppStatusAC>


export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) =>{
    try{
        dispatch(setAppStatusAC('loading'));
        const result = await authAPI.login(email, password, rememberMe)
        dispatch(initializedProfileAC(result.data))
        dispatch(setAppStatusAC('succeeded'));
    } catch(e: any){
        const error = e.res ? e.res.data.error : (e.message + ', more details in the console')
        console.log(error)
        // status
    }
};
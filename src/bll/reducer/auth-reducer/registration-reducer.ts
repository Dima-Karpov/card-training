import { authAPI } from "../../../dal/api-cards";
import { AppActionsType, AppThunk } from "../../store";
import { setAppStatusAC } from "../app-reducer";

export type RegisterUserActionType = ReturnType<typeof registerUser>


type InitialStateType = typeof initialState;
const initialState = {
    isRegistered: false
};

export const registrationReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'registretion/REGISTER-USER':
            return {
                ...state,
                isRegistered: action.isRegistered
            }
        default:
            return state
    }
};

//action
export const registerUser = (isRegistered: boolean) => ({ type: 'registretion/REGISTER-USER', isRegistered } as const);
// thunks
export const registerUserTC = (email: string, password: string): AppThunk => async (dispatch) => {
    try{
        dispatch(setAppStatusAC('loading'));
        await authAPI.singUp(email, password)
        dispatch(registerUser(true))
        dispatch(setAppStatusAC('succeeded'));
    } catch(e: any){
        const error = e.res ? e.res.data.error : (e.message + ', more details in the console');
        console.log(error);
        dispatch(setAppStatusAC("failed"));
    }
};



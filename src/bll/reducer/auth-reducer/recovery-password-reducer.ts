import { authAPI } from "../../../dal/api-cards";
import { AppActionsType, AppThunk } from "../../store";
import { setAppStatusAC } from "../app-reducer";

type InitialStateType = {
    errorMessage: string | null,
    isRecovered: boolean,
};

const initialState = {
    errorMessage: null,
    isRecovered: false,
};

export const restorePasswordReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'recovery/SET-STATUS-SENDING-MESSAGE':
            return {
                ...state,
                isRecovered: action.isRecovered
            }
        case 'recovery/SET-ERROR-MESSAGE':
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
};

//action
export const setStatusSendingMassage = (isRecovered: boolean) => ({ type: 'recovery/SET-STATUS-SENDING-MESSAGE', isRecovered } as const);
export const setErrorMassage = (errorMessage: string) => ({ type: 'recovery/SET-ERROR-MESSAGE', errorMessage } as const);

// thunks
export const restorePassword = (email: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        await authAPI.restorePassword(email);
        dispatch(setStatusSendingMassage(true));
        dispatch(setAppStatusAC('succeeded'));
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (`Restore password failed: ${e.message}.`);
        dispatch(setErrorMassage(error));
        alert(error);
        dispatch(setAppStatusAC("failed"));
    }
};

export type RestorePasswordActionType = ReturnType<typeof setStatusSendingMassage>
    | ReturnType<typeof setErrorMassage>
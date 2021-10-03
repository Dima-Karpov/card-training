import { CardType, GetCardsResponseType } from "../../dal/api-cards";
import { AppActionsType, AppThunk } from "../store";
import { SortPacksAndCardsOrderType } from "./packsList-reducer";
import { cardsApi } from './../../dal/api-cards';
import { setAppError, setAppStatusAC } from "./app-reducer";

const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    pageCount: 10,
    page: 1,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    token: '',
    tokenDeathTime: 0,
    searchCardsValue: '',

    sortCardsQuestionOrder: "default" as SortPacksAndCardsOrderType,
    sortCardsAnswerOrder: "default" as SortPacksAndCardsOrderType,
    sortCardsUpdateOrder: 0 as SortPacksAndCardsOrderType,
    sortCardsGradeOrder: "default" as SortPacksAndCardsOrderType,
    sortCardsFilter: "",
};

type InitialStateType = typeof initialState;


export const cardsListReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {
                ...state, ...action.cardsState
            }
        case 'cards/SET-CARDS-TOTAL-COUNT':
            return {
                ...state,
                cardsTotalCount: action.cardsTotalCount,
            }
        case 'cards/SET-CARDS-NEW-CURRENT-PAGE':
            return {
                ...state,
                page: action.newCurrentPage,
            }
        case 'cards/SET-CARDS-NEW-CARDS-PAGE-COUNT':
            return {
                ...state,
                pageCount: action.newPageCount,
            }
        case 'cards/SET-SEARCH-CARDS-VALUE':
            return {
                ...state,
                searchCardsValue: action.searchCardsValue
            }
        case 'cards/SET-SORT-QUESTION-CARDS':
            return {
                ...state,
                sortCardsQuestionOrder: action.sortCardsQuestionOrder,
                sortCardsAnswerOrder: "default",
                sortCardsUpdateOrder: "default",
                sortCardsGradeOrder: "default",
                sortCardsFilter: action.sortCardsFilter
            }
        case 'cards/SET-SORT-ANSWER-CARDS':
            return {
                ...state,
                sortCardsQuestionOrder: "default",
                sortCardsAnswerOrder: action.sortCardsAnswerOrder,
                sortCardsUpdateOrder: "default",
                sortCardsGradeOrder: "default",
                sortCardsFilter: action.sortCardsFilter
            }
        case 'cards/SET-SORT-UPDATE-CARDS':
            return {
                ...state,
                sortCardsQuestionOrder: "default",
                sortCardsAnswerOrder: "default",
                sortCardsUpdateOrder: action.sortCardsUpdateOrder,
                sortCardsGradeOrder: "default",
                sortCardsFilter: action.sortCardsFilter
            }
        case 'cards/SET-SORT-GRADE-CARDS':
            return {
                ...state,
                sortCardsQuestionOrder: "default",
                sortCardsAnswerOrder: "default",
                sortCardsUpdateOrder: "default",
                sortCardsGradeOrder: action.sortCardsGradeOrder,
                sortCardsFilter: action.sortCardsFilter
            }
        default:
            return state
    }
};

// action
export const setCards = (cardsState: GetCardsResponseType) => (
    { type: 'cards/SET-CARDS', cardsState } as const
);
export const setCardsTotalCount = (cardsTotalCount: number) => (
    { type: 'cards/SET-CARDS-TOTAL-COUNT', cardsTotalCount } as const
);
export const setCardsNewCurrentPage = (newCurrentPage: number) => (
    { type: 'cards/SET-CARDS-NEW-CURRENT-PAGE', newCurrentPage } as const
);
export const setCardsNewCardsPageCount = (newPageCount: number) => (
    { type: 'cards/SET-CARDS-NEW-CARDS-PAGE-COUNT', newPageCount } as const
);
export const setSearchCardsValue = (searchCardsValue: string) => (
    { type: 'cards/SET-SEARCH-CARDS-VALUE', searchCardsValue } as const
);
export const setSortQuestionCards = (sortCardsQuestionOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => (
    { type: 'cards/SET-SORT-QUESTION-CARDS', sortCardsQuestionOrder, sortCardsFilter } as const)

export const setSortAnswerCards = (sortCardsAnswerOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => (
    { type: 'cards/SET-SORT-ANSWER-CARDS', sortCardsAnswerOrder, sortCardsFilter } as const)

export const setSortUpdateCards = (sortCardsUpdateOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => (
    { type: 'cards/SET-SORT-UPDATE-CARDS', sortCardsUpdateOrder, sortCardsFilter } as const)

export const setSortGradeCards = (sortCardsGradeOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => (
    { type: 'cards/SET-SORT-GRADE-CARDS', sortCardsGradeOrder, sortCardsFilter } as const)


// thunks
export const getCards = (packId: string, page?: number, pageCount?: number, searchCardsValue?: string,
    sortCardsOrder?: SortPacksAndCardsOrderType, sortCardsFilter?: string): AppThunk =>
    async (dispatch) => {
        try {
            const res = await cardsApi.getCards(packId, page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter);
            dispatch(setCards(res.data));
            dispatch(setCardsTotalCount(res.data.cardsTotalCount))
        } catch (e: any) {
            const error = e.res ? e.res.data.error : (`Get cards faild: ${e.message}.`);
            console.log(error);
        }
    };

export const addCardTC = (packId: string, cardQuestion: string, cardAnswer: string): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const { page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter } = getState().cards;
            await cardsApi.addCard(packId, cardQuestion, cardAnswer);
            dispatch(getCards(packId, page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter));
            dispatch(setAppStatusAC("succeeded"));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : (`Add card failed: ${e.message}.`);
            console.log(error);
            dispatch(setAppStatusAC("failed"));
            dispatch(setAppError(error));
        }
    };

export const updateCard = (packId: string, cardId: string, newCardQuestion: string, newCardAnswer: string): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatusAC('loading'));
            const { page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter } = getState().cards;
            await cardsApi.updateCard(cardId, newCardQuestion, newCardAnswer);
            dispatch(getCards(packId, page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e: any) {
            const error = e.res ? e.res.data.error : (`Update, card failed: ${e.message}.`);
            console.log(error);
            dispatch(setAppError(error));
            dispatch(setAppStatusAC("failed"));
        }
    };

export const deleteCard = (packId: string, cardId: string): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatusAC('loading'));
            const { page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter } = getState().cards;
            await cardsApi.deleteCard(cardId);
            dispatch(getCards(packId, page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e: any) {
            const error = e.res ? e.res.data.error : (`Delete card failed: ${e.message}.`);
            console.log(error);
            dispatch(setAppError(error));
            dispatch(setAppStatusAC('failed'));
        }
    };

// type
export type CardsListReucerActionsType = ReturnType<typeof setCards>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setCardsNewCurrentPage>
    | ReturnType<typeof setCardsNewCardsPageCount>
    | ReturnType<typeof setSearchCardsValue>
    | ReturnType<typeof setSortQuestionCards>
    | ReturnType<typeof setSortAnswerCards>
    | ReturnType<typeof setSortUpdateCards>
    | ReturnType<typeof setSortGradeCards>
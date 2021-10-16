import { GetPacksResponseType, PackResponseType, packsListApi } from "../../dal/api-cards";
import { AppActionsType, AppThunk } from "../store";
import { setAppError, setAppStatusAC } from "./app-reducer";

export type SortPacksAndCardsOrderType = 0 | 1 | "default";

const initialState = {
    cardPacks: [] as PackResponseType[],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: '',
    tokenDeathTime: 0,
    user_id: '',

    isShowMyPacks: false,
    minCardsDoubleRangeValue: 0,
    maxCardsDoubleRangeValue: 0,
    searchPacksValue: '',

    sortPacksNameOrder: 'defaul' as SortPacksAndCardsOrderType,
    sortPacksCardsCountOrder: 'defaul' as SortPacksAndCardsOrderType,
    sortPacksUpdateOrder: 0 as SortPacksAndCardsOrderType,
    sortPacksCreateByOrder: 'default' as SortPacksAndCardsOrderType,
    sortPacksFilter: '',
};
type InitialStateType = typeof initialState;


export const packsListReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type)
    {
        case 'packs/SET-PACKS-LIST-STATE':
            return {
                ...state,
                ...action.packsState
            }
        case 'packs/CHANGE-SHOW-ALL-OR-MY-PACKS':
            return {
                ...state,
                isShowMyPacks: action.isShowMyPacks, user_id: action.userId,
            }
        case 'packs/SET-DOUBLE-RANGES-VALUES':
            return {
                ...state,
                minCardsDoubleRangeValue: action.minCardsDoubleRangeValue,
                maxCardsDoubleRangeValue: action.maxCardsDoubleRangeValue,
            }
        case 'packs/SET-SEARCH-PACKS-VALUE':
            return {
                ...state,
                searchPacksValue: action.searchPacksValue,
            }
        case 'packs/SET-SORT-PACKS-NAME-ORDER':
            return {
                ...state,
                sortPacksNameOrder: action.sortPacksNameOrder,
                sortPacksCardsCountOrder: 'default',
                sortPacksUpdateOrder: 'default',
                sortPacksCreateByOrder: 'default',
                sortPacksFilter: action.sortPacksFilter,
            }
        case 'packs/SET-SORT-PACKS-CARDS-COUNT-ORDER':
            return {
                ...state,
                sortPacksNameOrder: 'default',
                sortPacksCardsCountOrder: action.sortPacksCardsCountOrder,
                sortPacksUpdateOrder: 'default',
                sortPacksCreateByOrder: 'default',
                sortPacksFilter: action.sortPacksFilter,
            }
        case 'packs/SET-SORT-PACKS-UPDATE-ORDER':
            return {
                ...state,
                sortPacksNameOrder: 'default',
                sortPacksCardsCountOrder: 'default',
                sortPacksUpdateOrder: action.sortPacksUpdageOrder,
                sortPacksCreateByOrder: 'default',
                sortPacksFilter: action.sortPacksFilter,
            }
        case 'packs/SET-SORT-PACKS-CREATED-BY-ORDER':
            return {
                ...state,
                sortPacksNameOrder: 'default',
                sortPacksCardsCountOrder: 'default',
                sortPacksUpdateOrder: 'default',
                sortPacksCreateByOrder: action.sortPacksCreateByOrder,
                sortPacksFilter: action.sortPacksFilter,
            }
        case 'packs/SET-NEW-CURRENT-PAGE':
            return {
                ...state,
                page: action.page,
            }
        default:
            return state
    }
};

//AC 
export const setPacksListState = (packsState: GetPacksResponseType) => (
    { type: 'packs/SET-PACKS-LIST-STATE', packsState } as const
);
export const changeShowAllOrMyPacks = (isShowMyPacks: boolean, userId: string) => (
    { type: 'packs/CHANGE-SHOW-ALL-OR-MY-PACKS', isShowMyPacks, userId } as const
);
export const setDoubleRangesValue = (minCardsDoubleRangeValue: number, maxCardsDoubleRangeValue: number) => (
    { type: 'packs/SET-DOUBLE-RANGES-VALUES', minCardsDoubleRangeValue, maxCardsDoubleRangeValue } as const
);
export const setSearchPacksValue = (searchPacksValue: string) => (
    { type: 'packs/SET-SEARCH-PACKS-VALUE', searchPacksValue } as const
);
export const setSortPacksNameOrder = (sortPacksNameOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => (
    { type: 'packs/SET-SORT-PACKS-NAME-ORDER', sortPacksNameOrder, sortPacksFilter } as const
);
export const setSortPacksCardsCountOrder = (sortPacksCardsCountOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => (
    { type: 'packs/SET-SORT-PACKS-CARDS-COUNT-ORDER', sortPacksCardsCountOrder, sortPacksFilter } as const
);
export const setSortPacksUpdeatetOrder = (sortPacksUpdageOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => (
    { type: 'packs/SET-SORT-PACKS-UPDATE-ORDER', sortPacksUpdageOrder, sortPacksFilter } as const
);
export const setSortPacksCreatedByOrder = (sortPacksCreateByOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => (
    { type: 'packs/SET-SORT-PACKS-CREATED-BY-ORDER', sortPacksCreateByOrder, sortPacksFilter } as const
);
export const setNewCurrentPage = (page: number) => (
    { type: 'packs/SET-NEW-CURRENT-PAGE', page } as const
);
export const setNewPageCount = (pageCount: number) => (
    { type: 'packs/SET-NEW-PAGE-COUNT', pageCount } as const
)
//TC
export const fetchPacks = (searchPacksValue: string, min: number, max: number, sortPacksOrder: SortPacksAndCardsOrderType,
    sortPacksFilter: string, page: number, pageCount: number, user_id: string): AppThunk =>
    async (dispatch) => {
        try
        {
            const res = await packsListApi.getPacks(searchPacksValue, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id);
            dispatch(setPacksListState(res.data));
        } catch (e: any)
        {
            const error = e.res ? e.res.data.error : (`Get packs failed: ${e.massage}.`);
            console.log(error)
        }
    };

export const addNewPack = (packName: string, searchPacksValue: string, min: number, max: number, sortPacksOrder: SortPacksAndCardsOrderType,
    sortPacksFilter: string, page: number, pageCount: number, user_id: string): AppThunk =>
    async (dispatch) => {
        try
        {
            dispatch(setAppStatusAC('loading'));
            await packsListApi.addPack(packName);
            dispatch(fetchPacks(searchPacksValue, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id));
            dispatch(changeShowAllOrMyPacks(true, user_id));
            dispatch(setAppStatusAC('succeeded'))
        } catch (e: any)
        {
            const error = e.res ? e.res.data.error : `Add pack faild: ${e.message}.`
            dispatch(setAppError(error));
            console.log(error);
        }
    };

export const updatePack = (newPackName: string, packId: string, searchPacksValue: string, min: number, max: number, sortPacksOrder: SortPacksAndCardsOrderType,
    sortPacksFilter: string, page: number, pageCount: number, user_id: string): AppThunk =>
    async (dispatch) => {
        try
        {
            dispatch(setAppStatusAC('loading'));
            await packsListApi.updatePack(newPackName, packId);
            dispatch(fetchPacks(searchPacksValue, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id));
            dispatch(changeShowAllOrMyPacks(true, user_id));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e: any)
        {
            const error = e.res ? e.res.data.error : `Update pack failed: ${e.message}.`
            dispatch(setAppError(error));
            console.log(error);
            dispatch(setAppStatusAC('failed'));
        }
    };

export const deletePack = (packId: string, packName: string, min: number, max: number, sortPacksOrder: SortPacksAndCardsOrderType,
    sortPacksFilter: string, page: number, pageCount: number, user_id: string): AppThunk =>
    async (dispatch) => {
        try
        {
            dispatch(setAppStatusAC('loading'));
            await packsListApi.deletePack(packId);
            dispatch(fetchPacks(packName, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id));
            dispatch(changeShowAllOrMyPacks(true, user_id));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e: any)
        {
            const error = e.res ? e.res.data.error : `Delete pack failed: ${e.message}.`
            dispatch(setAppError(error));
            console.log(error);
            dispatch(setAppStatusAC('failed'));
        }
    }
//types
export type PacksListReducerActionType = ReturnType<typeof setPacksListState>
    | ReturnType<typeof changeShowAllOrMyPacks>
    | ReturnType<typeof setDoubleRangesValue>
    | ReturnType<typeof setSearchPacksValue>
    | ReturnType<typeof setSortPacksNameOrder>
    | ReturnType<typeof setSortPacksCardsCountOrder>
    | ReturnType<typeof setSortPacksUpdeatetOrder>
    | ReturnType<typeof setSortPacksCreatedByOrder>
    | ReturnType<typeof setNewCurrentPage>
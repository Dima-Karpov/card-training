import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AppStoreType } from '../../bll/store';
import { PATH } from '../App/App';
import { Button } from '../common/Button/Button';
import { DoubleRange } from '../common/DoubleRange/DoubleRange';
import s from './Profile.module.css'
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';
import { PacksListTabelMUI } from '../PacksList/PacksTableMUI/PacksListTableMUI';
import { useSelector, useDispatch } from 'react-redux';
import { PackResponseType } from '../../dal/api-cards';
import {
    fetchPacks, setDoubleRangesValue, setSearchPacksValue, setSortPacksCardsCountOrder, SortPacksAndCardsOrderType,
    setSortPacksNameOrder, setSortPacksUpdeatetOrder, setSortPacksCreatedByOrder, addNewPack, updatePack, deletePack,
    setNewCurrentPage, setNewPageCount
} from './../../bll/reducer/packsList-reducer';
import { ModalWindowAdd } from '../common/ModalWindow/modalAdd/ModalWindowAdd';
import { Input } from '../common/Input/Input';

export const Profile: React.FC = React.memo(() => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn);
    const user_id = useSelector<AppStoreType, string>(state => state.app.userData._id);

    const { searchPacksValue, minCardsCount, maxCardsCount, sortPacksNameOrder, sortPacksCardsCountOrder, sortPacksUpdateOrder,
        sortPacksCreateByOrder, sortPacksFilter, page, pageCount } = useSelector((state: AppStoreType) => state.packs);

    const { minCardsDoubleRangeValue, maxCardsDoubleRangeValue, cardPacksTotalCount } = useSelector((state: AppStoreType) => state.packs);

    const packs = useSelector<AppStoreType, PackResponseType[]>(state => state.packs.cardPacks);

    const [openModalWindow, setOpenOpenModalWindow] = useState<boolean>(false);
    // const pagesCount = Math.ceil(cardPacksTotalCount / pageCount);

    useEffect(() => {
        switch (sortPacksFilter) {
            case 'name':
                dispatch(fetchPacks(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue,
                    sortPacksNameOrder, sortPacksFilter, page, pageCount, user_id));
                break;
            case 'cardsCount':
                dispatch(fetchPacks(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue,
                    sortPacksCardsCountOrder, sortPacksFilter, page, pageCount, user_id));
                break;
            case 'updated':
                dispatch(fetchPacks(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue,
                    sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id));
                break;
            case 'user_name':
                dispatch(fetchPacks(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue,
                    sortPacksCreateByOrder, sortPacksFilter, page, pageCount, user_id));
                break;
            default: {
                const setTimer = setTimeout(() => {
                    dispatch(fetchPacks(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue,
                        sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id))
                }, 300);
                return () => {
                    clearTimeout(setTimer);
                }
            }
        }
    }, [dispatch, searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksNameOrder, sortPacksCardsCountOrder,
        sortPacksUpdateOrder, sortPacksCreateByOrder, sortPacksFilter, page, pageCount, user_id]);

    const setDoubleRangeValues = useCallback((minCardsDoubleRangeValue: number, maxCardsDoubleRangeValue: number) => {
        dispatch(setDoubleRangesValue(minCardsDoubleRangeValue, maxCardsDoubleRangeValue))
    }, [dispatch]);

    const setSearchValues = useCallback((newSearchPacksValue: string) => {
        dispatch(setSearchPacksValue(newSearchPacksValue))
    }, [dispatch]);

    const setNewSortPacksNameOrder = useCallback((sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => {
        dispatch(setSortPacksNameOrder(sortPacksOrder, sortPacksFilter))
    }, [dispatch]);

    const setNewSortPacksCardsCountOrder = useCallback((sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => {
        dispatch(setSortPacksCardsCountOrder(sortPacksOrder, sortPacksFilter))
    }, [dispatch]);

    const setNewSortPacksUpdateOrder = useCallback((sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => {
        dispatch(setSortPacksUpdeatetOrder(sortPacksOrder, sortPacksFilter))
    }, [dispatch]);

    const setNewSortPacksCreatedByOrder = useCallback((sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => {
        dispatch(setSortPacksCreatedByOrder(sortPacksOrder, sortPacksFilter))
    }, [dispatch]);

    const addPack = useCallback((packName: string) => {
        dispatch(addNewPack(packName, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id]);

    const updatePacks = useCallback((newPackName: string, packId: string) => {
        dispatch(updatePack(newPackName, packId, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id]);

    const removePack = useCallback((packId: string) => {
        dispatch(deletePack(packId, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id]);

    const setNewCurrentPages = useCallback((newCurrentPage: number) => {
        dispatch(setNewCurrentPage(newCurrentPage))
    }, [dispatch]);

    const setNewPagesCount = useCallback((newPageCount: number) => {
        dispatch(setNewPageCount(newPageCount))
    }, [dispatch]);

    const onCloseModalHandler = useCallback(() => {
        setOpenOpenModalWindow(false)
    }, []);

    const onAddNewClickPackHandler = useCallback((newValue: string) => {
        addPack(newValue);
        setOpenOpenModalWindow(false);
    }, [addPack]);


    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN} />
    }
    console.log('Profile - isLoggedIn', isLoggedIn)


    return (
        <div className={s.packsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.aside}>
                        <ProfileAvatar />
                        <div className={s.rangeWrap}>
                            <DoubleRange
                                minCardsCount={1}
                                maxCardsCount={100}
                                setDoubleRangeValues={() => { }}
                            />
                        </div>
                    </div>

                    <div className={s.content}>
                        <div className={s.tableTitle}>Packs List</div>
                        <div className={s.topWrap}>
                            <Input onKeyPressEnter={setSearchValues}/>
                            <Button name='Add new pack' className={s.buttonAddPack} onClick={() => setOpenOpenModalWindow(true)} />
                        </div>
                        <PacksListTabelMUI 
                            user_id={user_id}
                            packs={packs}
                            setNewSortPacksNameOrder={setNewSortPacksNameOrder}
                            setNewSortPacksCardsCountOreder={setNewSortPacksCardsCountOrder}
                            setNewSortPacksUpdateOrder={setNewSortPacksUpdateOrder}
                            setNewSortPacksCreatedByOrder={setNewSortPacksCreatedByOrder}
                            updatePack={updatePacks}
                            removePack={removePack}

                        />
                        {openModalWindow && <ModalWindowAdd
                            addNewPack={onAddNewClickPackHandler}
                            closeModal={onCloseModalHandler}
                        />}

                    </div>
                </div>

            </div>

        </div>
    )
})
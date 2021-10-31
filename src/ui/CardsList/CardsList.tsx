import React, { useCallback, useEffect, useState } from 'react';
import s from './CardsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreType } from '../../bll/store';
import { useParams, useHistory } from 'react-router';
import {
  addCardTC, deleteCardTC, getCards, setCardsNewCardsPageCount, setCardsNewCurrentPage,
  setSearchCardsValue, setSortQuestionCards, updateCardTC
} from './../../bll/reducer/cardsList-reducer';
import { SortPacksAndCardsOrderType } from '../../bll/reducer/packsList-reducer';
import { Button } from '../common/Button/Button';
import { ModalWindowCardInfo } from '../common/ModalWindow/modalCardInfo/ModalWindowCardInfo';

export const CardsList: React.FC = React.memo(() => {

  const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn);
  const user_id = useSelector<AppStoreType, string>(state => state.app.userData._id);
  // const packUserId = useSelector<AppStoreType, string>(state => state.cards.packUserId);
  const packUserId = '6127b5d6dc3ceb00046fc60c'
  const dispatch = useDispatch();

  const { cards, cardsTotalCount, searchCardsValue, sortCardsQuestionOrder, sortCardsAnswerOrder, sortCardsUpdateOrder,
    sortCardsGradeOrder, sortCardsFilter, pageCount, page } = useSelector((state: AppStoreType) => state.cards);

  const [openNewCardModal, setOpenNewCardModal] = useState<boolean>(false);

  // const pagesCount = Math.ceil(cardsTotalCount / pageCount);

  const { packId } = useParams<{ packId: string }>();
  const history = useHistory();

  useEffect(() => {
    switch (sortCardsFilter)
    {
      case 'question':
        dispatch(getCards(packId, page, pageCount, searchCardsValue, sortCardsQuestionOrder, sortCardsFilter));
        break;
      case 'answer':
        dispatch(getCards(packId, page, pageCount, searchCardsValue, sortCardsAnswerOrder, sortCardsFilter));
        break;
      case 'updated':
        dispatch(getCards(packId, page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter));
        break;
      case 'grade':
        dispatch(getCards(packId, page, pageCount, searchCardsValue, sortCardsGradeOrder, sortCardsFilter));
        break;
    }
  }, [dispatch, searchCardsValue, sortCardsQuestionOrder, sortCardsAnswerOrder, sortCardsUpdateOrder,
    sortCardsGradeOrder, sortCardsFilter, pageCount, page]);

  const redirectToPacksListHandler = () => history.push('/');

  // sorting cards
  const setCardsSearchValue = useCallback((newSeacthCardsValue: string) => {
    dispatch(setSearchCardsValue(newSeacthCardsValue));
  }, [dispatch]);
  const setNewSortQuestionOrder = useCallback((sortCardsQuectionOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => {
    dispatch(setSortQuestionCards(sortCardsQuectionOrder, sortCardsFilter));
  }, [dispatch]);
  const setNewSortAnswerOrder = useCallback((sortCardsAnswerOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => {
    dispatch(setSortQuestionCards(sortCardsAnswerOrder, sortCardsFilter));
  }, [dispatch]);
  const setNewSortUpdateOrder = useCallback((sortCardsOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => {
    dispatch(setSortQuestionCards(sortCardsOrder, sortCardsFilter));
  }, [dispatch]);
  const setNewSortGradeOrder = useCallback((sortCardsGradeOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => {
    dispatch(setSortQuestionCards(sortCardsGradeOrder, sortCardsFilter));
  }, [dispatch]);

  const addNewCard = useCallback((cardQuestion: string, cardAnswer: string) => {
    dispatch(addCardTC(packId, cardQuestion, cardAnswer));
  }, [dispatch]);
  const updateCard = useCallback((cardId: string, newCardQuestion: string, newCardAnswer: string) => {
    dispatch(updateCardTC(packId, cardId, newCardQuestion, newCardAnswer));
  }, [dispatch]);
  const deleteCard = useCallback((cardId: string) => {
    dispatch(deleteCardTC(packId, cardId));
  }, [dispatch]);

  const setCardNewCurrentPage = useCallback((newCurrentPage: number) => {
    dispatch(setCardsNewCurrentPage(newCurrentPage));
  }, [dispatch]);
  const setCardNewPageCount = useCallback((newPageCount: number) => {
    dispatch(setCardsNewCardsPageCount(newPageCount));
  }, [dispatch]);

  const onAddNewHandler = useCallback((question: string, answer: string) => {
    addNewCard(question, answer);
    setOpenNewCardModal(false);
  }, [addNewCard]);

  // jod modalWindow
  const onOpenModalHandler = useCallback(() => {
    setOpenNewCardModal(true);
  }, []);
  const onCloseModalHandler = useCallback(() => {
    setOpenNewCardModal(false);
  }, []);

  console.log('CardsList', packId);
  console.log('CardsList boolean', packUserId === user_id);
  console.log('packUserId', packUserId);
  console.log('user_id', user_id);


  return (
    <div className={s.cardsList}>
      <div className={s.container}>
        <span className={s.topWrap}>
          <button onClick={redirectToPacksListHandler} className={s.btn} />
          <h2 className={s.title}>Pack Name</h2>
        </span>
        <div className={s.searchWrap}>
          {/* SearchInput */}
          {packUserId === user_id &&
            <Button
              name='Add new card'
              onClick={() => onOpenModalHandler()}
              red={true}
            />}
          {cards.length === 0
            ? <span className={s.empty} >This pack is empty. Click add new card to fill this pack.</span>
            : <>
                table
            </>
            }
            {openNewCardModal
            && <ModalWindowCardInfo
              name='Add new card'
              editCard={onAddNewHandler}
              closeModal={onCloseModalHandler}
              />}
        </div>
        Okay!!

      </div>
    </div>
  )
})
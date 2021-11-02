import React, { useCallback, useState } from 'react';
import { SortPacksAndCardsOrderType } from '../../../bll/reducer/packsList-reducer';
import { CardType } from '../../../dal/api-cards';
import { useSelector } from 'react-redux';
import { AppStoreType } from '../../../bll/store';
import { TableContainer, Table, Paper, TableRow, TableBody, TableHead } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './CardsListTableMUIStyle';
import { ItemsFilterSpan } from '../../common/ItemFilterSpan/ItemFilterSpan';
import { ModalWindowDelete } from '../../common/ModalWindow/ModalDelete/ModalWindowDelete';
import { ModalWindowCardInfo } from '../../common/ModalWindow/modalCardInfo/ModalWindowCardInfo';

type CardsListTableMUIPropsType = {
  user_id: string
  tableState: CardType[]

  updateCard: (cardId: string, newCardQuestion: string, newCardAnswer: string) => void
  deleteCard: (cardId: string) => void

  setNewSortQuestionOrder: (sortCardsQuestionOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => void
  setNewSortAnswerOrder: (sortCardsAnswerOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => void
  setNewSortUpdateOrder: (sortCardsUpdateOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => void
  setNewSortGradeOrder: (sortCardsGradeOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => void
};

export const CardsListTabelMUI: React.FC<CardsListTableMUIPropsType> = React.memo((props) => {
  const { user_id, tableState, updateCard, deleteCard, setNewSortQuestionOrder,
    setNewSortAnswerOrder, setNewSortUpdateOrder, setNewSortGradeOrder } = props;

  const { sortCardsQuestionOrder, sortCardsUpdateOrder,
    sortCardsAnswerOrder, sortCardsGradeOrder } = useSelector((state: AppStoreType) => state.cards);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const [id, setId] = useState<string>('');

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const onDeleteCardHandler = useCallback(() => {
    deleteCard(id);
    setOpenDeleteModal(false);
  }, [deleteCard]);

  const onRemoveHandle = useCallback((id: string, question: string) => {
    setOpenDeleteModal(true);
    setId(id);
    setQuestion(question);
  }, []);

  const onUpdatePackHandler = useCallback((packId: string, question: string, answer: string) => {
    setOpenEditModal(true);
    setId(packId);
    setQuestion(question);
    setAnswer(answer);
  }, []);

  const onEditNewPackHandler = useCallback((question: string, answer: string) => {
    updateCard(id, question, answer);
  }, [updateCard, id]);

  const onCancelHandler = useCallback(() => {
    setOpenDeleteModal(false);
    setOpenEditModal(false);
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-lable='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <ItemsFilterSpan
                title={'Question'}
                status={sortCardsQuestionOrder}
                setSetStatusValue={setNewSortQuestionOrder}
              />
            </StyledTableCell>
            <StyledTableCell>
              <ItemsFilterSpan
                title={'Answer'}
                status={sortCardsAnswerOrder}
                setSetStatusValue={setNewSortAnswerOrder}
              />
            </StyledTableCell>
            <StyledTableCell>
              <ItemsFilterSpan
                title={'Last Update'}
                status={sortCardsUpdateOrder}
                setSetStatusValue={setNewSortUpdateOrder}
              />
            </StyledTableCell>
            <StyledTableCell>
              <ItemsFilterSpan
                title={'Grade'}
                status={sortCardsGradeOrder}
                setSetStatusValue={setNewSortGradeOrder}
              />
            </StyledTableCell>
            {user_id === tableState[0].user_id
              && <StyledTableCell>Action</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {openDeleteModal
            && <ModalWindowDelete
              name='Card'
              packName={question}
              onDeleteButtonClick={onDeleteCardHandler}
              onCloseModalButtonClick={onCancelHandler}
            />}
          {openEditModal
            && <ModalWindowCardInfo
              name='Edit card'
              question={question}
              answer={answer}
              editCard={onEditNewPackHandler}
              closeModal={onCancelHandler}
            />}
          {tableState.map((card) => (
            <StyledTableRow key={card._id}>
              <StyledTableCell>{card.question}</StyledTableCell>
              <StyledTableCell>{card.answer}</StyledTableCell>
              <StyledTableCell>{card.updated.slice(0, 10)}</StyledTableCell>
              <StyledTableCell></StyledTableCell> 
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
});
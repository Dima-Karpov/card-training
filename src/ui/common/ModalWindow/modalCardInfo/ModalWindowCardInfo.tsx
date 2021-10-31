import React from "react";
import s from '../ModalWindow.module.css';
import { CardInfo } from './CardsInfo';

type ModalWindowCardInfoPorpsType = {
  name: string
  question?: string
  answer?: string
  editCard: (question: string, answer: string) => void
  closeModal: () => void
};

export const ModalWindowCardInfo: React.FC<ModalWindowCardInfoPorpsType> = React.memo((props) => {
  const { name, question, answer, editCard, closeModal } = props;
  return (
    <div className={s.modalWindow}>
      <CardInfo
        name={name}
        answer={answer}
        question={question}
        onAddNewHandler={editCard}
        onCloseModalButtonClick={closeModal}
      />
    </div>
  );
});
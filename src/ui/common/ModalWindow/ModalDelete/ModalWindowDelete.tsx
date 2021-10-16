import React from 'react';
import s from '../ModalWindow.module.css';
import { ModalDelete } from './ModalDelete';

type ModalWindowDeletePropsType = {
  name: string
  packName: string
  onDeleteButtonClick: any
  onCloseModalButtonClick: any
};

export const ModalWindowDelete: React.FC<ModalWindowDeletePropsType> = React.memo((props) => {
  const { name, packName, onDeleteButtonClick, onCloseModalButtonClick } = props;
  return (
    <div className={s.modalWindow}>
      <ModalDelete
        name={name}
        packName={packName}
        onCloseModalButtonClick={onCloseModalButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </div>
  )
});
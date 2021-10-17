import React from 'react';
import s from '../ModalWindow.module.css'
import { ModalEdit } from './ModalEdit';

type ModalWindowPackPropsType = {
  packName: string
  editNewPack: (newValue: string) => void
  closeModal?: () => void
};

export const ModalWindowEditPack: React.FC<ModalWindowPackPropsType> = React.memo((props) => {
  const { packName, editNewPack, closeModal } = props;
  return (
    <div className={s.modalWindow}>
      <ModalEdit
        packName={packName}
        onEditNewPackButtonClick={editNewPack}
        onCloseModalButtonClick={closeModal}
      />
    </div>
  );
});
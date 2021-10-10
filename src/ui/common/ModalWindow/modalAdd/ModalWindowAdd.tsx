import React from 'react';
import s from '../ModalWindow.module.css';
import { ModalAdd } from './ModalAdd';

type ModalWindowAddPropsType = {
    addNewPack: (newValue: string) => void
    closeModal: () => void
}

export const ModalWindowAdd: React.FC<ModalWindowAddPropsType> = React.memo(props => {
    const {addNewPack, closeModal} = props;
    
    return (
        <div className={s.modalWindow}>
            <ModalAdd
                onAddNewPackHandler={addNewPack}
                onCloseModalButtonClick={closeModal}
            />
        </div>
    )
});

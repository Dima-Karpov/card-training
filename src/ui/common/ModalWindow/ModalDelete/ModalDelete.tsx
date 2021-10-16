import React from 'react';
import { Button } from '../../Button/Button';
import s from './ModalDelete.module.css';

type ModalDeletPropsType = {
    name: string
    packName: string
    onDeleteButtonClick: any
    onCloseModalButtonClick: any
}

export const ModalDelete: React.FC<ModalDeletPropsType> = React.memo(props => {
    const { name, packName, onDeleteButtonClick, onCloseModalButtonClick } = props;

    return (
        <div className={s.modalDelet}>
            <div className={s.modalTop}>
                <h2 className={s.caption}>Delete {name}: </h2>
                <button onClick={onCloseModalButtonClick} className={s.btnCross} />
            </div>
            <div>
                <span className={s.text}>Do you really want to remove
                    <span className={s.accent}>{name} Name - {packName} </span>
                    All cards will be excluded from this course.
                </span>
            </div>
            <div className={s.btns}>
                <Button
                    name='Cansel'
                    onClick={onCloseModalButtonClick}
                    className={s.button}
                />
                <Button
                    name='Delete'
                    onClick={onDeleteButtonClick}
                    className={s.button}
                />
            </div>

        </div>

    )
});
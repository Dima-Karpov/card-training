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
            <div className={s.captionBtn}>
                <button onClick={onCloseModalButtonClick} className={s.btnClose} />
            </div>
            <h2 className={s.caption}>Delete {name}: </h2>
            <div className={s.inputWrap}>
                <span className={s.text}>Do you really want to remove
                    <span className={s.accent}> {name} name - <span style={{ color: 'green' }}>{packName}</span>? </span>
                    All cards will be excluded from this course.
                </span>
            </div>
            <div className={s.btns}>
                <Button
                    red={true}
                    name='Cansel'
                    onClick={onCloseModalButtonClick}
                    className={s.button}
                />
                <Button
                    red={true}
                    name='Delete'
                    onClick={onDeleteButtonClick}
                    className={s.button}
                />
            </div>

        </div>

    )
});
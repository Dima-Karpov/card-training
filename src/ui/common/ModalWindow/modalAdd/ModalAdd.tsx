import React, { ChangeEvent, useCallback, useState, MouseEvent } from 'react';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import s from './ModalAdd.module.css'

type ModaleAddPropsType = {
    onAddNewPackHandler: (newValue: string) => void
    onCloseModalButtonClick?: () => void
}

export const ModalAdd: React.FC<ModaleAddPropsType> = React.memo(props => {
    const { onAddNewPackHandler, onCloseModalButtonClick } = props;

    const [title, setTitle] = useState<string>('');

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }, []);
    const addSaveHandler = useCallback(() => {
        if (title.trim() !== '')
        {
            onAddNewPackHandler(title);
            setTitle('');
        }
    }, [onAddNewPackHandler, title]);

    const offActiveModal = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

    return (
        <div className={s.modalBlock} onClick={offActiveModal}>
            <div className={s.captionBtn}>
                <button onClick={onCloseModalButtonClick} className={s.btnClose} />
            </div>
            <div className={s.caption}>
                <h2 >Add new pack</h2>
            </div>
            <Input
                value={title}
                onChange={onChangeHandler}
                autoFocus
                type='text'
            />
            <div className={s.blockBtn}>
                <Button
                    red={true}
                    name='Cancel'
                    onClick={onCloseModalButtonClick}
                />
                <Button
                    red={true}
                    name='Save'
                    onClick={addSaveHandler}
                />
            </div>
        </div>
    )
});
import React, { ChangeEvent, useCallback, useState, MouseEvent} from 'react';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import s from './ModalEdit.module.css';

type ModalEditPropsType = {
  packName: string
  onEditNewPackButtonClick: (newValue: string) => void
  onCloseModalButtonClick?: () => void
};

export const ModalEdit: React.FC<ModalEditPropsType> = React.memo((props) => {
  const { packName, onEditNewPackButtonClick, onCloseModalButtonClick } = props;

  const [title, setTitle] = useState<string>(packName);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }, []);
  const onSaveClickHandler = useCallback(() => {
    if (title.trim() !== ""){
      onEditNewPackButtonClick(title);
      setTitle("");
    }
  }, [onEditNewPackButtonClick, title]);

  const offActiveModal = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return (
    <div className={s.modalEdit} onClick={offActiveModal}>
      <div className={s.modalTop}>
        <div className={s.captionBtn}>
          <button onClick={onCloseModalButtonClick} className={s.btnClose} />
        </div>
        <h2 className={s.caption}>Edit pack: </h2>
      </div>
      <div className={s.inputWrap}>
        <Input
          type='text'
          value={title}
          onChange={onChangeHandler}
        />
      </div>
      <div className={s.btns}>
        <Button
          name='Cansel'
          onClick={onCloseModalButtonClick}
          red={true}
        />
        <Button
          name='Save'
          onClick={onSaveClickHandler}
          red={true}
        />
      </div>
    </div>
  )
})
import React, { ChangeEvent, useCallback, useState } from "react";
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";
import s from './CardInfo.module.css';

type CardInfoPropsType = {
  name: string
  question?: string
  answer?: string
  onAddNewHandler: (question: string, answer: string) => void
  onCloseModalButtonClick: () => void
};

export const CardInfo: React.FC<CardInfoPropsType> = React.memo((props) => {
  const { name, question, answer, onAddNewHandler, onCloseModalButtonClick } = props;

  const [questionValue, setQuestionValue] = useState<string>(question ? question : '');
  const [answerValue, setAnswerValue] = useState<string>(answer ? answer : '');

  const onChangeHandlerQuestion = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuestionValue(e.currentTarget.value)
  }, []);
  const onChangeHandlerAnswer = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAnswerValue(e.currentTarget.value)
  }, []);

  const addSaveHandler = useCallback(() => {
    if (questionValue.trim() !== '')
    {
      onAddNewHandler(questionValue, answerValue);
      setQuestionValue('');
      setAnswerValue('');
    }
  }, [onAddNewHandler, questionValue, answerValue]);


  return (
    <div className={s.cardInfo}>
      <h2 className={s.caption}>{name}:</h2>
      <div className={s.inputBox}>
        <div className={s.inputWrap}>
          <Input
            value={questionValue}
            onChangeHandler={onChangeHandlerQuestion}
            placeholder='Question'
          />
        </div>
        <div className={s.inputWrap}>
          <Input
            
            value={questionValue}
            onChangeHandler={onChangeHandlerAnswer}
            placeholder='Answer'
          />
        </div>
        <div className={s.btns}>
          <Button
            name='Cansel'
            red={true}
            onClick={onCloseModalButtonClick}
          />
          <Button
            name='Save'
            red={true}
            onClick={addSaveHandler}
          />
        </div>
      </div>
    </div>
  )
})
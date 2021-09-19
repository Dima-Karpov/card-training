import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from "react";
import s from './Input.module.css'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & { 
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}


export const Input: React.FC<SuperInputTextPropsType> = React.memo((props) => {

    const {
        onChangeText,
        onEnter,
        error,
        spanClassName,
        onChange,
        onKeyPress,
        ...restProps
    } = props;

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e) && onChangeText && onChangeText(e.currentTarget.value)
    };
    const onKeyPreesCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e) && onEnter && e.key === 'Enter' && onEnter()
    }

    return (
        <>
            <input
                onChange={onChangeCallback}
                onKeyPress={onKeyPreesCallback}
                className={s.input}
                {...restProps}
            />
        </>

    )
});
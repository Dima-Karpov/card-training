import React, { useState, ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useCallback } from "react";
import s from './Input.module.css'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & { 
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPressEnter?: (value: string) => void
}


export const Input: React.FC<SuperInputTextPropsType> = React.memo((props) => {

    const {
        onChangeText,
        onEnter,
        error,
        spanClassName,
        onChange,
        onKeyPress,
        onKeyPressEnter,
        ...restProps
    } = props;

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
            && onChange(e) // то передать ему е (поскольку onChange не обязателен)
        onChangeText && onChangeText(e.currentTarget.value)
    }

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
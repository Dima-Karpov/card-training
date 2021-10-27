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
    const [searchValue, setSearchValue] = useState<string>("")

    const onChangeCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
        //@ts-ignore
        onKeyPressEnter(searchValue.trim())
    }, [onKeyPressEnter, searchValue]);

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
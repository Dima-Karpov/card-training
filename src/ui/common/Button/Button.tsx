import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from "./Button.module.css"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    name: string

}

export const Button: React.FC<ButtonPropsType> = React.memo(({ name, red, className, ...restProps }) => {

    const finalClassName = `${red ? styles.button : styles.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        >
            {name}
        </button>
    )
});
import React from 'react';
import s from './ButtomSmall.module.css'

type ButtomSmallTypeProps = {
    name: string
    onClick?: () => void
    disabled?: boolean
    style?: any
}

export const ButtonSmall: React.FC<ButtomSmallTypeProps> = React.memo((porps) => {
    const {
        name,
        onClick,
        disabled,
        style,
    } = porps;

    return (
        <>
            {disabled
                ? <button onClick={onClick} disabled={disabled} className={s.buttonSmallDisabled}>{name}</button>
                : <button onClick={onClick} className={s.buttonSmall} style={style}>{name}</button>
            }
        </>
    )
});
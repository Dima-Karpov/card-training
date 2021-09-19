import React from "react";
import s from './Heading.module.css'

type HeadingPropsType = {
    name: string
}

export const Heading: React.FC<HeadingPropsType> = React.memo(({name}) => {
    return (
        <div className={s.content}>
            <h1 className={s.h1}>It-incubator</h1>
            <h2>{name}</h2>
        </div>
    )
});
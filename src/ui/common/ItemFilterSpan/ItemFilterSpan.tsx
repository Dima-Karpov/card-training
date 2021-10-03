import React from 'react';

type ItemsFilterSpanPropsType = {
    title: string
    status?: any
    setSetStatusValue?: Function
}

export const ItemsFilterSpan: React.FC<ItemsFilterSpanPropsType> = React.memo((props) => {
    const {title, status, setSetStatusValue} = props;

    return (
        <span>
            {title}
            {status === 0 ? "▼": status === 1 ? "▲" : ""}
        </span>
    )
})
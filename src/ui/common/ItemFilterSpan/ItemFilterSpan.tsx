import React, { useCallback } from 'react';
import s from './ItemFilterSpan.module.css';
import { SortPacksAndCardsOrderType } from '../../../bll/reducer/packsList-reducer';

type ItemsFilterSpanPropsType = {
    title: string
    status?: SortPacksAndCardsOrderType
    setSetStatusValue: (sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
};

export const ItemsFilterSpan: React.FC<ItemsFilterSpanPropsType> = React.memo((props) => {
    const { title, status, setSetStatusValue } = props;

    const onStatusClickHandler = useCallback(() => {
        switch (title)
        {
            case 'Name':
                status === 1
                    ? setSetStatusValue(0, 'name')
                    : setSetStatusValue(1, 'name')
                break
            case 'Cards':
                status === 1
                    ? setSetStatusValue(0, 'cardsCount')
                    : setSetStatusValue(1, 'cardsCount')
                break
            case 'Last Update':
                status === 1
                    ? setSetStatusValue(0, 'updated')
                    : setSetStatusValue(1, 'updated')
                break
            case 'Created by':
                status === 1
                    ? setSetStatusValue(0, 'user_name')
                    : setSetStatusValue(1, 'user_name')
                break
            case 'Created by':
                status === 1
                    ? setSetStatusValue(0, 'user_name')
                    : setSetStatusValue(1, 'user_name')
                break
        }
    }, [])

    return (
        <span onClick={onStatusClickHandler} className={s.spanTitle}>
            {title}
            {status === 0 ? "▼" : status === 1 ? "▲" : ""}
        </span>
    )
})
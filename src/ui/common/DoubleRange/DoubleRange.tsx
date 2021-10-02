import React, { useCallback, useState } from 'react';
import s from './DoubleRange.module.css';
import Slider from '@mui/material/Slider';

type DoubleRangePropsType = {
    minCardsCount: number
    maxCardsCount: number
    setDoubleRangeValues: (minValue: number, maxValue: number) => void
}
export const DoubleRange: React.FC<DoubleRangePropsType> = React.memo((props) => {
    const {minCardsCount, maxCardsCount, setDoubleRangeValues} = props;

    const [value, setValue] = useState<number[]>([0, maxCardsCount]);

    const onDoubleRangeHandlerChange = useCallback((event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
        setDoubleRangeValues(value[0], value[1]);
    }, [setDoubleRangeValues, value])

    return(
        <div className={s.numberCards}>
            <h2 className={s.title}>Number of cards: </h2>
            <div className={s.root}>
                <Slider
                    value={value}
                    onChange={onDoubleRangeHandlerChange}
                    aria-labelledby="range-slider"
                    min={props.minCardsCount}
                    max={props.maxCardsCount}
                />
            </div>
        </div>
    )
})
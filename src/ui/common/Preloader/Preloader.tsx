import React from "react";
import s from './Preloader.module.css';
import loader from '../../../assets/images/loader.svg';
import { useSelector } from "react-redux";
import { AppStoreType } from "../../../bll/store";
import { RequestStatusType } from "../../../bll/reducer/auth-reducer/auth-reducer";


export const Preloader: React.FC = React.memo(() => {

    const status = useSelector<AppStoreType, RequestStatusType>(state => state.auth.status);

    if (status !== 'loading') {
        return null
    };

    return (
        <div className={s.loaderContainer}>
            <div className={s.loader}>
                <img alt='icon' src={loader} />
            </div>
        </div>

    )
});
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStoreType } from '../../bll/store';
import { PATH } from '../App/App';

export const Profile: React.FC = React.memo(() => {
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN} />
    }
    console.log('Profile - isLoggedIn', isLoggedIn)
   
   
    return (
        <div>
            Ава.ТАблица с моими пакетами. 
        </div>
    )
})
import React from 'react';
import { Button } from '../Button/Button';
import s from './HeaderMenu.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppStoreType } from '../../../bll/store';
import { HeaderMenuStatusType, setHeaderMenuStatus } from '../../../bll/reducer/app-reducer';
import { Redirect, useHistory } from 'react-router';
import { logout } from '../../../bll/reducer/auth-reducer/auth-reducer';
import { PATH } from '../../App/App';

export const HeaderMenu: React.FC = React.memo(() => {

    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn);

    const headerMenuStatus = useSelector<AppStoreType, HeaderMenuStatusType>(state => state.app.headerMenuStatus);
    const dispatch = useDispatch();
    const history = useHistory();

    const packsListClassName = headerMenuStatus === 'packsList' ? `${s.tabPack} ${s.activeHeaderMenuItem}` : s.tabPack;
    const profileClassName = headerMenuStatus === 'profile' ? `${s.tabProfile} ${s.activeHeaderMenuItem}` : s.tabProfile;

    const onChangeHeaderMenuStatus = (headerMenuStatus: HeaderMenuStatusType) => {
        if (headerMenuStatus === 'packsList') {
            history.push('/packsList')
        } else {
            history.push(PATH.PROFILE)
        }
        dispatch(setHeaderMenuStatus(headerMenuStatus))
    };

    const onLogoutClickHandler = () => {
        dispatch(logout())
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN} />
    }
    console.log('Header Menu - isLoggedIn', isLoggedIn)

    return (
        <div className={s.containerHeader}>
            <div className={s.title}>IT-incubator</div>

            <div className={s.tabsWrap}>
                <div className={packsListClassName} onClick={() => { onChangeHeaderMenuStatus('packsList') }}>
                    Packs list
                </div>
                <div className={profileClassName} onClick={() => { onChangeHeaderMenuStatus('profile') }}>
                    Profile
                </div>
              
            </div>
            <Button name='Log out' className={s.buttonLogOut} onClick={onLogoutClickHandler} />

        </div>
    )
})
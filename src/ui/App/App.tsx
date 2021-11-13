import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import s from './App.module.css';
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';
import { PasswordRecovery } from '../PasswordRecovery/PasswordRecovery';
import { PasswordChange } from '../PasswordChange/PasswordChange';

import { useSelector, useDispatch } from 'react-redux';
import { AppStoreType } from '../../bll/store';
import { initializedApp, RequestStatusType } from '../../bll/reducer/auth-reducer/auth-reducer';
import { Redirect } from 'react-router-dom';
import { HeaderMenu } from '../common/HeaderMenu/HeaderMenu';
import { Profile } from '../Profile/Profile';
import { CardsList } from '../CardsList/CardsList';



export const App: React.FC = () => {

  const dispatch = useDispatch();
  const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);
  const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn);
  const isInitialized = useSelector<AppStoreType, boolean>(state => state.auth.isInitialized);

  console.log('App - isInitialized', isInitialized)

  console.log('App - isLoggedIn', isLoggedIn)

  useEffect(() => {
    dispatch(initializedApp())
  }, [dispatch])

  if (status === 'loading')
  {
    return <div style={{ position: 'fixed', top: '40%', textAlign: 'center', width: '100%' }}>
      Loadig...
    </div>
  }

  return (
    <div className={s.app}>
      <Routes />

    </div>
  );
};

export const PATH = {
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  PASSWORD_RECOVERY: '/password-recovery',
  UPDATE_PASSWORD: '/updatePassword/:token',
  PASSWORD_CHANGE: '/password-change',
  PROFILE: '/profile',
  CARDS: `/cardsList`, // : wath?
}


export const Routes: React.FC = React.memo(() => {

  const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn);
  const { pathname } = useLocation();


  return (

    <>
      {isLoggedIn && pathname !== '/404' && <HeaderMenu />}

      <Switch>
        <Route path={"/"} exact render={() => <Redirect to={"/login"} />} />
        <Route path={PATH.LOGIN} render={() => <Login />} />
        <Route path={PATH.SIGN_UP} render={() => <Registration />} />
        <Route path={PATH.PASSWORD_RECOVERY} render={() => <PasswordRecovery />} />
        <Route path={PATH.PASSWORD_CHANGE} render={() => <PasswordChange />} />
        <Route path={PATH.PROFILE} render={() => <Profile />} />
        <Route path={PATH.CARDS + `/:packId`} render={() => <CardsList />} />
      </Switch>

    </>
  )
});




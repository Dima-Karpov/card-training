import React, { useEffect } from 'react';
import { Route } from 'react-router';
import s from './App.module.css';
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';
import { PasswordRecovery } from '../PasswordRecovery/PasswordRecovery';
import { PasswordChange } from '../PasswordChange/PasswordChange';

import { useSelector, useDispatch } from 'react-redux';
import { AppStoreType } from '../../bll/store';
import { Preloader } from '../common/Preloader/Preloader';
import { initializedApp } from '../../bll/reducer/auth-reducer/auth-reducer';
import { Redirect } from 'react-router-dom';



export const App: React.FC = () => {

  const dispatch = useDispatch();
  const isInitialized = useSelector<AppStoreType, boolean>(state => state.auth.isInitialized);
  const userId = useSelector<AppStoreType, string>(state => state.auth.profile._id);

  useEffect(() => {
    !userId && dispatch(initializedApp())
  }, [dispatch, userId])

  if(!isInitialized){
    return <Preloader/>
  }
  console.log('app - isInitialized', isInitialized)

  return (
    <div className={s.app}>
      <Routes/>
      <Preloader/>
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
}


export const Routes: React.FC = React.memo(() => {
  return (
      <>
        <Route path={"/"} exact render={() => <Redirect to={"/login"}/>}/>
        <Route path={PATH.LOGIN} render={() => <Login/>}/>
        <Route path={PATH.SIGN_UP} render={() => <Registration/>}/>
        <Route path={PATH.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
        <Route path={PATH.PASSWORD_CHANGE} render={() => <PasswordChange/>}/>
        <Route path={PATH.PROFILE} render={() => <PasswordChange/>}/>
      </>
    )
});




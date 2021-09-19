
import React from 'react';
import { Route } from 'react-router';
import s from './App.module.css';
import { Login } from '../Login/Login';
// import { useSelector } from 'react-redux';
// import { AppStoreType } from '../../bll/store';
// import { Preloader } from '../common/Preloader/Preloader';



export const App: React.FC = () => {

  // const isInitialized = useSelector<AppStoreType, boolean>(state => state.auth.isInitialized);

  // if(!isInitialized){
  //   return <Preloader/>
  // }

  return (
    <div className={s.app}>
      <Routes/>
      {/* <Preloader/> */}
    </div>
  );
};

export const PATH = {
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  PASSWORD_RECOVERY: '/password-recovery',
}


export const Routes: React.FC = React.memo(() => {
  return (
      <>
        <Route path={PATH.LOGIN} render={() => <Login/>}/>
      </>
    )
});



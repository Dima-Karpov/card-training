
import React from 'react';
import { Route } from 'react-router';
import s from './App.module.css';
import { Login } from '../Login/Login';



export const App: React.FC = () => {
  return (
    <div className={s.app}>
      <Routes/>
    </div>
  );
};

export const PATH = {
  LOGIN: '/login',
}


export const Routes: React.FC = React.memo(() => {
  return (
      <>
        <Route path={PATH.LOGIN} render={() => <Login/>}/>
      </>
    )
});




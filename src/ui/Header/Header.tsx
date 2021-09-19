import React from "react";
import s from './Header.module.css';
import profile from '../../assets/images/profile.svg';
import packs from '../../assets/images/packs.svg';
import { LinkButton } from "./Link/Link";


export const Header: React.FC = React.memo(() => {
    return (
      <div className={s.containerHeader}>
        <div className={s.title}>
          IT-incubator
        </div>
        <span className={s.containerHeader}>
          <LinkButton path={'/profile'} icon={profile} title='Profile' />
          <LinkButton path={'/packList'} icon={packs} title='Packs list' />
        </span>
  
      </div>
    )
  });
import React from "react";
import { NavLink } from "react-router-dom";
import s from './Link.module.css';

type LinkButtonPropsType = {
    path: string
    icon: string
    title: string
  }
  export const LinkButton: React.FC<LinkButtonPropsType> = React.memo((props) => {
  
    const {
      path,
      icon,
      title,
    } = props;
  
    return (
      <div className={s.linkButton}>
        <NavLink to={path}>
          {<div style={{ textAlign: 'center' }}>
            <img style={{ textAlign: 'center' }} src={icon} alt={path} />
            {title}
            <span className={s.line} />
          </div>}
        </NavLink>
      </div>
    )
  })
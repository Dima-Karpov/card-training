import React from 'react';
import styles from '../Login/Login.module.css';
import s from './PasswordChange.module.css'
import icon from '../../assets/images/email.svg';



export const PasswordChange: React.FC = React.memo(() => {
    return (
        <div className={styles.container}>

            <div className={styles.form}>
                <div className={s.iconBg}>
                    <img alt="icon" src={icon} />
                </div>

                <h2 className={s.caption}>Check Email</h2>
                <p className={s.text}>We've sent an Email with instructions to example to </p>
                
            </div>

        </div>
    )
});
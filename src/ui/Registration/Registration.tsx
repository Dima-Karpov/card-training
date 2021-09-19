import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH } from '../App/App';
import { Button } from '../common/Button/Button';
import { Heading } from '../common/Heading/Heading';
import { Input } from '../common/Input/Input';
import styles from '../Login/Login.module.css';
import s from './Registration.module.css';
import styleButton from '../common/Button/Button.module.css'


export const Registration: React.FC = React.memo(() => {
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <Heading name={'Sung Up'} />
                <form className={s.content}>
                    <Input
                        type='email'
                        placeholder='Email'
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                    />
                    <Input
                        type='password'
                        placeholder='Confirm password'
                    />
                    <div className={s.btnContainer}>
                        <NavLink to={PATH.LOGIN}>
                            <Button name='Cansel' className={s.button} />
                        </NavLink>
                        <Button name='Registar' className={styleButton.button} />
                    </div>
                </form>
            </div>
        </div>
    )
});
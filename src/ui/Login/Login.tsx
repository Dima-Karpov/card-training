import React from "react"
import s from './Login.module.css'
import commonStyle from '../App/App.module.css';
import styleButton from '../../ui/common/Button/Button.module.css';
import { Input } from "../common/Input/Input";
import { Checkbox } from "../common/Checkbox/Checkbox";
import { Button } from "../common/Button/Button";

export const Login: React.FC = React.memo(() => {
    return (
        <div className={s.container}>
            <div className={s.form}>
                <div className={s.content}>
                    <h1 className={commonStyle.h1}>It-incubator</h1>
                    <h2>Sing In</h2>
                </div>
                <form className={s.content}>
                    <Input
                        type='email'
                        placeholder='Email'
                    />
                    <Input
                        type={'password'}
                        placeholder={'Password'}
                    />
                    <label htmlFor='rememberMe'>Remember me</label>
                    <Checkbox
                        name='rememberMe'
                    />
                </form>
                <div className={s.button}>
                    <Button name='Login' type={"submit"} className={styleButton.button}/>
                </div>



            </div>
        </div>

    )
});


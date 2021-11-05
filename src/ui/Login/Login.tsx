import React, { useState } from "react"
import s from './Login.module.css';
import commonStyle from '../App/App.module.css';
import styleButton from '../../ui/common/Button/Button.module.css';
import { Input } from "../common/Input/Input";
import { Checkbox } from "../common/Checkbox/Checkbox";
import { Button } from "../common/Button/Button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { PATH } from "../App/App";
import { Heading } from "../common/Heading/Heading";
import { login } from "../../bll/reducer/auth-reducer/auth-reducer";
import { AppStoreType } from "../../bll/store";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login: React.FC = React.memo(() => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn);

    const [typeIcon, setTypeIcon] = useState<string>('password');

    const showHide = () => {
        setTypeIcon(typeIcon === 'text' ? 'password' : 'text')
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 7) {
                errors.password = 'Please enter your password'
            }
            return errors;
        },
        onSubmit: valuse => {
            dispatch(login(valuse.email, valuse.password, valuse.rememberMe));
            formik.resetForm()
        },
    });
    if(isLoggedIn){
        return <Redirect to={PATH.PROFILE}/>
    }

    console.log('login - isLoggedIn',isLoggedIn);

    return (
        <div className={s.container}>
            <div className={s.form}>
                <Heading name='Sing In' />
                <form className={s.content} onSubmit={formik.handleSubmit}>
                    <Input
                        type='email'
                        placeholder='Email'
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? <div className={commonStyle.error}>{formik.errors.email}</div> : null}
                    <Input
                        type={typeIcon}
                        placeholder='Password'
                        {...formik.getFieldProps('password')}
                    />

                    <span className={s.showHidePassword}
                        onClick={showHide}>{typeIcon === 'text' ? '🔒' : '🔑'}</span>

                    {formik.touched.password && formik.errors.password ? <div className={commonStyle.error}>{formik.errors.password}</div> : null}
                    <label htmlFor='rememberMe'>Remember me</label>
                    <Checkbox
                        name='rememberMe'
                        onChange={formik.handleChange}
                        checked={formik.values.rememberMe}
                    />
                </form>
                <NavLink to={PATH.PASSWORD_RECOVERY} className={s.forgotLink}>Forgot Password</NavLink>
                <div className={s.button}>
                    <form onSubmit={formik.handleSubmit}>
                        <Button name='Login' type={'submit'} className={styleButton.button} />
                    </form>
                    
                    <div style={{ color: 'gray' }}>
                        Dont't have an account?
                        <NavLink to={PATH.SIGN_UP} className={s.singLink}>Sing Up</NavLink>
                    </div>
                </div>
            </div>
        </div>

    )
});



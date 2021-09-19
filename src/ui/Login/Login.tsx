import React from "react"
import s from './Login.module.css';
import commonStyle from '../App/App.module.css';
import styleButton from '../../ui/common/Button/Button.module.css';
import { Input } from "../common/Input/Input";
import { Checkbox } from "../common/Checkbox/Checkbox";
import { Button } from "../common/Button/Button";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginTC } from './../../bll/reducer/auth-reducer';
import { NavLink } from 'react-router-dom';
import { PATH } from "../App/App";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login: React.FC = React.memo(() => {

    const dispatch = useDispatch();

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
            } else if (values.password.length < 6) {
                errors.password = 'Please enter your password'
            }
            return errors;
        },
        onSubmit: valuse => {
            dispatch(loginTC(valuse.email, valuse.password, valuse.rememberMe));
            formik.resetForm()
        },
    });



    return (
        <div className={s.container}>
            <div className={s.form}>
                <div className={s.content}>
                    <h1 className={commonStyle.h1}>It-incubator</h1>
                    <h2>Sing In</h2>
                </div>
                <form className={s.content} onSubmit={formik.handleSubmit}>
                    <Input
                        type='email'
                        placeholder='Email'
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? <div className={commonStyle.error}>{formik.errors.email}</div> : null}
                    <Input
                        type={'password'}
                        placeholder={'Password'}
                        {...formik.getFieldProps('password')}
                    />
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
                        <Button name='Login' type={"submit"} className={styleButton.button} />
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


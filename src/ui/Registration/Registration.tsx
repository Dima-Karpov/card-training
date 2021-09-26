import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { PATH } from '../App/App';
import { Button } from '../common/Button/Button';
import { Heading } from '../common/Heading/Heading';
import { Input } from '../common/Input/Input';
import styles from '../Login/Login.module.css';
import s from './Registration.module.css';
import styleButton from '../common/Button/Button.module.css'
import commonStyle from '../App/App.module.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreType } from '../../bll/store';
import { registerUserTC } from '../../bll/reducer/auth-reducer/registration-reducer';

type FormikErrorType = {
    email?: string
    password?: string
    confirmation?: string
}

export const Registration: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const isSingUp = useSelector<AppStoreType, boolean>(state => state.registr.isRegistered);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmation: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password required';
            } else if (values.password.length < 7) {
                errors.password = 'Must be more then 7 characters';
            }

            if (values.password && !values.confirmation) {
                errors.confirmation = 'Confirm password';
            } else if (values.password !== values.confirmation) {
                errors.confirmation = 'Password mismatch';
            }
            return errors;
        },
        onSubmit: values => {
            if (values.password === values.confirmation) {
                dispatch(registerUserTC(values.email, values.password));
                formik.resetForm();
            }
        }
    });

    if (isSingUp) {
        return <Redirect to={PATH.LOGIN} />
    }
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <Heading name={'Sung Up'} />
                <form className={s.content} onSubmit={formik.handleSubmit} autoComplete='off'>
                    <Input
                        type='email'
                        placeholder='Email'
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email 
                        ? <div className={commonStyle.error}>{formik.errors.email}</div> : null}
                    <Input
                        type={'password'}
                        placeholder='Password'
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password 
                        ? <div className={commonStyle.error}>{formik.errors.password}</div> : null}
                    <Input
                        type='password'
                        placeholder='Confirm password'
                        {...formik.getFieldProps('confirmation')}
                    />
                    {formik.touched.confirmation && formik.errors.confirmation 
                        ? <div className={commonStyle.error}>{formik.errors.confirmation}</div> : null}
                    
                    <div className={s.btnContainer}>
                        <NavLink to={PATH.LOGIN}>
                            <Button name='Cansel' className={s.button} />
                        </NavLink>
                        <Button type={'submit'} name='Registar' className={styleButton.button} />
                    </div>

                </form>
            </div>
        </div>
    )
});
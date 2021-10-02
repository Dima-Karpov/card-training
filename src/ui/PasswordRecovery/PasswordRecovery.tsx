import React from 'react';
import s from './PasswordRecovery.module.css';
import style from '../Registration/Registration.module.css';
import styles from '../Login/Login.module.css';
import styleButton from '../common/Button/Button.module.css';
import { Heading } from '../common/Heading/Heading';
import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { NavLink, Redirect } from 'react-router-dom';
import { PATH } from '../App/App';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { restorePassword } from '../../bll/reducer/auth-reducer/recovery-password-reducer';
import { AppStoreType } from '../../bll/store';
import { RequestStatusType } from '../../bll/reducer/auth-reducer/auth-reducer';

type FormikErrorType = {
    email?: string
}


export const PasswordRecovery: React.FC = React.memo(() => {

    const dispatch = useDispatch();
    const recovered = useSelector<AppStoreType, boolean>(state => state.restorePassword.isRecovered);
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn);
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const error: FormikErrorType = {};
            if (!values.email) {
                error.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = 'Invalid email addres';
            }
            return error;
        },
        onSubmit: values => {
            dispatch(restorePassword(values.email));
            formik.resetForm();
        },
    });

    if (recovered) {
        return <Redirect to={PATH.PASSWORD_CHANGE} />
    };
    if (isLoggedIn) {
        return <Redirect to={PATH.LOGIN} />
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <Heading name={' Password Recovery '} />

                <form className={style.content} onSubmit={formik.handleSubmit} autoComplete='off'>
                    <Input
                        type='email'
                        placeholder='Email'
                        {...formik.getFieldProps('email')}
                    />

                    {formik.touched.email && formik.errors.email
                        ? <div>{formik.errors.email}</div>
                        : <div>&nbsp;</div>}

                    <p className={s.instruction}>
                        Enter your email address and we will send you further instructions.
                    </p>
                    <Button
                        name='Send Instruction'
                        className={styleButton.button}
                        disabled={status === 'loading'}
                        type={'submit'}
                    />
                    <div className={s.question}> Did you remember your password?</div>
                    <NavLink to={PATH.LOGIN} className={s.tryLogging}>
                        Try logging in
                    </NavLink>
                </form>

            </div>
        </div>
    )
})
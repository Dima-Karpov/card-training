import React from 'react';
import { useSelector } from 'react-redux';
import { AppStoreType } from '../../../bll/store';
import s from './ProfileAvatar.module.css';
import defaultAvatar from '../../../assets/images/defaultUserAvatar.png'
import { NavLink } from 'react-router-dom';
import { Button } from '../../common/Button/Button';


export const ProfileAvatar: React.FC = React.memo(() => {
    const { name, avatar } = useSelector((state: AppStoreType) => state.app.userData);

    console.log('name', name)

    return (
        <div className={s.porfileAvatar}>
            {avatar
                ? <div className={s.avatarWrap}>
                    <img className={s.avatar} src={avatar} alt='avatar' />
                </div>
                : <div className={s.avatarWrap}>
                    <img className={s.avatar} src={defaultAvatar} alt='avatar' />
                </div>
            }
            <h2 className={s.name}>{name}</h2>
            <span className={s.career}>Front-end developer</span>

            <div className={s.profileAvatarButtonContainer}>
                <NavLink to={'/editProfile'}>
                    <Button name='Edit profile' className={s.profileAvatarButton} />
                </NavLink>

            </div>
        </div>
    )
});
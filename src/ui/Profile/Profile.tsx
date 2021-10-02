import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStoreType } from '../../bll/store';
import { PATH } from '../App/App';
import { Button } from '../common/Button/Button';
import { DoubleRange } from '../common/DoubleRange/DoubleRange';
import { Input } from '../common/Input/Input';
import s from './Profile.module.css'
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';

export const Profile: React.FC = React.memo(() => {
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN} />
    }
    console.log('Profile - isLoggedIn', isLoggedIn)


    return (
        <div className={s.packsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.aside}>
                        <ProfileAvatar />
                        <div className={s.rangeWrap}>
                            <DoubleRange
                                minCardsCount={10}
                                maxCardsCount={100}
                                setDoubleRangeValues={() => { }}
                            />
                        </div>
                    </div>

                    <div className={s.content}>
                        <div className={s.tableTitle}>Packs List</div>
                        <Input/>
                        <Button name='Add new pack' className={s.button} onClick={() => alert('Open Moddal Window')}/>
                    </div>
                </div>

            </div>

        </div>
    )
})
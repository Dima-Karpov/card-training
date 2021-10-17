import React, { useCallback, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';

import { SortPacksAndCardsOrderType } from '../../../bll/reducer/packsList-reducer';
import { PackResponseType } from '../../../dal/api-cards';
import { ItemsFilterSpan } from '../../common/ItemFilterSpan/ItemFilterSpan';
import { StyledTableCell, StyledTableRow } from './PacksListTableMUIStyles';
import { NavLink } from 'react-router-dom';
import s from './PacksListTableMUI.module.css';
import { ButtonSmall } from '../../common/Button/ButtonSmall/ButtomSmall';
import { ModalWindowDelete } from '../../common/ModalWindow/ModalDelete/ModalWindowDelete';
import { ModalWindowEditPack } from '../../common/ModalWindow/modalEdit/ModalWindowEditPack';

type PacksListTableMUIPropsType = {
    user_id: string
    packs: PackResponseType[]

    setNewSortPacksNameOrder: (sortPacksNameOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    setNewSortPacksCardsCountOreder: (sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    setNewSortPacksUpdateOrder: (sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    setNewSortPacksCreatedByOrder: (sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void

    updatePack: (newPackName: string, packId: string) => void
    removePack: (packId: string) => void
}

export const PacksListTabelMUI: React.FC<PacksListTableMUIPropsType> = React.memo((props) => {

    const {
        user_id,
        packs,
        setNewSortPacksNameOrder,
        setNewSortPacksCardsCountOreder,
        setNewSortPacksUpdateOrder,
        setNewSortPacksCreatedByOrder,
        updatePack,
        removePack,
    } = props;

    const [openDeleteModalWindow, setOpenDeleteModalWindow] = useState<boolean>(false);
    const [openEditModalWindow, setOpenEditModalWindow] = useState<boolean>(false);

    const [id, setId] = useState<string>('');
    const [packName, setPackName] = useState<string>('');

    const onEditNewPackHandler = useCallback((newValue: string) => {
        updatePack(newValue, id);
    }, [updatePack, id]);

    const onDeletePackHandler = useCallback(() => {
        removePack(id);
    }, [removePack, id]);

    const onRemoveClickHandler = useCallback((id: string, name: string) => {
        setOpenDeleteModalWindow(true);
        setId(id);
        setPackName(name);
    }, []);

    const onCancelClickHandler = useCallback(() => {
        setOpenDeleteModalWindow(false);
        setOpenEditModalWindow(false);
    }, []);
    const onUpdatePackHandler = useCallback((packId: string, packName: string) => {
        setOpenEditModalWindow(true);
        setId(packId);
        setPackName(packName);
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table arial-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title='Name'
                                status={''}
                                setSetStatusValue={() => { }}
                            />
                        </StyledTableCell>
                        <StyledTableCell aling='right'>
                            <ItemsFilterSpan
                                title='Cards'
                                status={''}
                                setSetStatusValue={() => { }}
                            />
                        </StyledTableCell>
                        <StyledTableCell aling='right'>
                            <ItemsFilterSpan
                                title='Last Update'
                                status={''}
                                setSetStatusValue={() => { }}
                            />
                        </StyledTableCell>
                        <StyledTableCell aling='right'>
                            <ItemsFilterSpan
                                title='Created by'
                                status={''}
                                setSetStatusValue={() => { }}
                            />
                        </StyledTableCell>
                        <StyledTableCell aling='right'>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map(pack => (<StyledTableRow key={pack._id}>
                        <StyledTableCell component='ht' scope='row'>
                            <NavLink to={`/cardsList/${pack._id}`}>{pack.name}</NavLink>
                        </StyledTableCell>
                        <StyledTableCell>{pack.cardsCount}</StyledTableCell>
                        <StyledTableCell>{pack.updated.slice(0, 10)}</StyledTableCell>
                        <StyledTableCell>{pack.user_name}</StyledTableCell>
                        <StyledTableCell>
                            <div className={s.buttonsContainer}>
                                {
                                    user_id === pack.user_id
                                        ?
                                        <>
                                            <ButtonSmall
                                                name='delete'
                                                onClick={() => onRemoveClickHandler(pack._id, pack.name)}
                                                style={{ backgroundColor: '#F1453D', color: '#ffffff' }}
                                            />
                                            <ButtonSmall
                                                name='edit'
                                                onClick={() => onUpdatePackHandler(pack._id, pack.name)}
                                                style={{ backgroundColor: '#D7D8EF', color: '#21268F' }}
                                            />
                                            <NavLink to={`/learnCard/${pack._id}`}>
                                                <ButtonSmall
                                                    name='learn'
                                                    disabled={pack.cardsCount === 0}
                                                    style={{ backgroundColor: '#D7D8EF', color: '#21268F' }}
                                                />
                                            </NavLink>
                                        </>
                                        :
                                        <>
                                            <NavLink to={`/learnCard/${pack._id}`}>
                                                <ButtonSmall
                                                    name='learn'
                                                    style={{ backgroundColor: '#D7D8EF', color: '#21268F' }}
                                                    disabled={pack.cardsCount === 0}
                                                />
                                            </NavLink>
                                        </>
                                }
                            </div>
                        </StyledTableCell>
                    </StyledTableRow>))}
                </TableBody>
                {openDeleteModalWindow &&
                    <ModalWindowDelete
                        name='Pack'
                        packName={packName}
                        onDeleteButtonClick={onDeletePackHandler}
                        onCloseModalButtonClick={onCancelClickHandler}
                    />
                }
                {openEditModalWindow &&
                    <ModalWindowEditPack
                        packName={packName}
                        editNewPack={onEditNewPackHandler}
                        closeModal={onCancelClickHandler}
                    />
                }
            </Table>
        </TableContainer>
    )
})
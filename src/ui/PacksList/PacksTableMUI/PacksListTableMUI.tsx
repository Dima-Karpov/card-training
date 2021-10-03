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
import { StyledTableCell } from './PacksListTableMUIStyles';

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
    }, [])

    return(
       <TableContainer component={Paper}>
           <Table arial-label='customized table'>
                <TableHead>
                    <TableRow>
                    <StyledTableCell>
                        <ItemsFilterSpan
                        title='Name'
                        status={''}
                        setSetStatusValue={()=>{}}
                        />
                    </StyledTableCell>
                    <StyledTableCell aling='right'>
                        <ItemsFilterSpan
                        title='Cards'
                        status={''}
                        setSetStatusValue={()=>{}}
                        />
                    </StyledTableCell>
                    <StyledTableCell aling='right'>
                        <ItemsFilterSpan
                        title='Last Update'
                        status={''}
                        setSetStatusValue={()=>{}}
                        />
                    </StyledTableCell>
                    <StyledTableCell aling='right'>
                        <ItemsFilterSpan
                        title='Created by'
                        status={''}
                        setSetStatusValue={()=>{}}
                        />
                    </StyledTableCell>
                    <StyledTableCell aling='right'>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                </TableBody>

           </Table>
       </TableContainer>
    )
})
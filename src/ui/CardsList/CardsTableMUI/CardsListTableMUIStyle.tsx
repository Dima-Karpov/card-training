import { withStyles, createStyles } from '@mui/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Theme } from '@mui/material/styles/createTheme';



export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#ECECF9',
      color: '#2D2E46',
      fontFamily: 'SFUIDisplay, sans-serif',
      fontWeight: 600,
      lineHeight: '1.05',
      '& span': {
        cursor: 'pointer',
      },
    },
    body: {
      fontSize: 13,
      boxShadow: '0px 4px 14px rgba(45, 46, 70, 0.15',
    },
  })
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: '#F8F7FD',
      },
    },
  })
)(TableRow);
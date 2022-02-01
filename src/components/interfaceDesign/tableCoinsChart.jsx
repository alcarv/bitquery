import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein, tx) {
  return { name, calories, fat, carbs, protein, tx };
}

const rows = [
  createData('Buy', 159, 6.0, 24, 4.0, 'Example'),
  createData('Sell', 237, 9.0, 37, 4.3, 'Example'),
  createData('Buy', 262, 16.0, 24, 6.0, 'Example'),
  createData('Sell', 305, 3.7, 67, 4.3, 'Example'),
  createData('Buy', 356, 16.0, 49, 3.9, 'Example'),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper} id="tableCoin">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Buy/Sell</TableCell>
            <TableCell align="right">Tokens</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Price/Token</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">TX</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.tx}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  customername: string,
  projecttitle: string,
  salesproductname: string,
  quantity: number,
  income: number,
  negotiationflag: string,
  edit: string
) {
  return {
    name,
    customername,
    projecttitle,
    salesproductname,
    quantity,
    income,
    negotiationflag,
    edit,
  };
}

const rows = [
  createData(
    "染井大輔",
    "A商事株式会社",
    "宅急便発送案件",
    "宅急便",
    10000,
    5000,
    "交渉中",
    "編集"
  ),
  createData(
    "染井大輔",
    "A商事株式会社",
    "宅急便発送案件",
    "宅急便",
    10000,
    5000,
    "交渉中",
    "編集"
  ),
  createData(
    "染井大輔",
    "A商事株式会社",
    "宅急便発送案件",
    "宅急便",
    10000,
    5000,
    "交渉中",
    "編集"
  ),
  createData(
    "染井大輔",
    "A商事株式会社",
    "宅急便発送案件",
    "宅急便",
    10000,
    5000,
    "交渉中",
    "編集"
  ),
  createData(
    "染井大輔",
    "A商事株式会社",
    "宅急便発送案件",
    "宅急便",
    10000,
    5000,
    "交渉中",
    "編集"
  ),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>営業マン名</StyledTableCell>
            <StyledTableCell align="center">顧客名</StyledTableCell>
            <StyledTableCell align="center">案件名</StyledTableCell>
            <StyledTableCell align="center">販売商品名</StyledTableCell>
            <StyledTableCell align="center">見込み個数</StyledTableCell>
            <StyledTableCell align="center">見込み収入</StyledTableCell>
            <StyledTableCell align="center">交渉フラグ</StyledTableCell>
            <StyledTableCell align="center">編集</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.customername}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.projecttitle}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.salesproductname}
              </StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.income}</StyledTableCell>
              <StyledTableCell align="right">
                {row.negotiationflag}
              </StyledTableCell>
              <Button variant="contained" color="secondary" sx={{ m: 1 }}>
                編集
              </Button>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

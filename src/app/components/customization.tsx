"use client";

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
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/client";

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

interface CustomerData {
  id: string;
  date: string;
  customerName: string;
  projectTitle: string;
  productName: string;
  piece: string;
  income: string;
  negotiationflag: string;
  comment: string;
  edit: string;
  venderTeamId: string;
  venderUid: string;
}

export default function CustomizedTables() {
  const [customerList, setCustomerList] = React.useState<CustomerData[]>([]);

  React.useEffect(() => {
    const getCustomers = async () => {
      const data = await getDocs(collection(db, "customers"));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const customersData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CustomerData[];
      console.log(customersData);
      setCustomerList(customersData);
    };
    getCustomers();
  }, []);

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

//@ts-nocheck
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
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [customerList, setCustomerList] = React.useState<CustomerData[]>([]);
  const getVenderName = async (venderUid: string) => {
    const venderRef = doc(db, "users", venderUid);
    const venderDoc = await getDoc(venderRef);
    const venderData = venderDoc.exists()
      ? venderDoc.data()
      : { name: "Unknown" };
    return venderData.name;
  };

  React.useEffect(() => {
    const getCustomers = async () => {
      const data = await getDocs(collection(db, "customers"));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const customersData = (await Promise.all(
        data.docs.map(async (doc) => {
          const customerData = doc.data();
          customerData.venderName = await getVenderName(customerData.venderUid);
          return customerData;
        })
      )) as CustomerData[];
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
            <StyledTableCell align="center">チーム名</StyledTableCell>
            <StyledTableCell align="center">営業マン名</StyledTableCell>
            <StyledTableCell align="center">顧客名</StyledTableCell>
            <StyledTableCell align="center">案件名</StyledTableCell>
            <StyledTableCell align="center">販売商品名</StyledTableCell>
            <StyledTableCell align="center">見込み個数</StyledTableCell>
            <StyledTableCell align="center">見込み収入</StyledTableCell>
            <StyledTableCell align="center">交渉フラグ</StyledTableCell>
            <StyledTableCell align="center">コメント</StyledTableCell>
            <StyledTableCell align="center">編集</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerList.map((customer) => {
            return (
              <StyledTableRow key={customer.id}>
                <StyledTableCell component="th" scope="row">
                  {customer.venderTeamId}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {customer.venderName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.customerName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.projectTitle}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.productName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.piece}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.income}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.negotiationflag}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.comment}
                </StyledTableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ m: 1 }}
                  onClick={() => router.push(`/itemedit?id=${customer.id}`)}
                >
                  編集
                </Button>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

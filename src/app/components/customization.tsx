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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/client";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& td": {
    padding: theme.spacing(2),
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
  acquisitionMonth: string;
  comment: string;
  edit: string;
  venderTeamId: string;
  venderUid: string;
  venderName: string; // 新しいプロパティを追加
}

export default function CustomizedTables() {
  const router = useRouter();
  const [customerList, setCustomerList] = React.useState<CustomerData[]>([]);
  const [customerToDelete, setCustomerToDelete] = React.useState<string | null>(
    null
  );
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    React.useState(false);
  const [selectedNegotiationFlag, setSelectedNegotiationFlag] =
    React.useState("すべて");
  const [selectedMonth, setSelectedMonth] = React.useState("すべて");
  const [selectedAcquisitionMonth, setSelectedAcquisitionMonth] =
    React.useState("すべて");

  const handleNegotiationFlagChange = (e) => {
    setSelectedNegotiationFlag(e.target.value);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleAcquisitionMonthChange = (e) => {
    setSelectedAcquisitionMonth(e.target.value);
  };

  //VenderUidからVenderNameを取得
  const getVenderName = async (venderUid: string) => {
    const venderRef = doc(db, "users", venderUid);
    const venderDoc = await getDoc(venderRef);
    const venderData = venderDoc.exists()
      ? venderDoc.data()
      : { name: "Unknown" };
    return venderData.name;
  };

  //VenderUidからVenderteamIdを取得・・・追加
  const getVenderTeam = async (venderUid: string) => {
    const venderTeamRef = doc(db, "users", venderUid);
    const venderTeamDoc = await getDoc(venderTeamRef);
    const venderTeamData = venderTeamDoc.exists()
      ? venderTeamDoc.data()
      : { teamId: "Unknown" };
    return venderTeamData.teamId;
  };

  const getTeamAdmin = async (venderUid: string) => {
    const teamAdminRef = doc(db, "users", venderUid);
    const teamAdminDoc = await getDoc(teamAdminRef);
    const teamAdminData = teamAdminDoc.exists()
      ? teamAdminDoc.data()
      : { isTeamAdmin: "Unknown" };
    return teamAdminData.isTeamAdmin;
  };

  React.useEffect(() => {
    const getCustomers = async () => {
      // ユーザーのログイン情報を取得
      const user = auth.currentUser;
      if (!user) return; // ユーザーがログインしていない場合は処理を終了

      const venderUid = user.uid;

      const venderTeamId = await getVenderTeam(venderUid);
      const isTeamAdmin = await getTeamAdmin(venderUid);

      const data = await getDocs(collection(db, "customers"));
      const customersData = (await Promise.all(
        data.docs.map(async (doc) => {
          const customerData = doc.data();
          customerData.venderName = await getVenderName(customerData.venderUid);
          return customerData;
        })
      )) as CustomerData[];

      // ログインしている本人のvenderUidと一致する情報のみをフィルタリング
      const filteredCustomersData = customersData.filter((customer) => {
        if (isTeamAdmin === true) {
          return customer.venderTeamId === venderTeamId;
        } else {
          return (
            customer.venderUid === venderUid &&
            customer.venderTeamId === venderTeamId
          );
        }
      });
      console.log(venderTeamId);
      console.log(isTeamAdmin);

      console.log(filteredCustomersData);
      setCustomerList(filteredCustomersData);
    };
    getCustomers();
  }, []);

  const handleDeleteClick = (id: string) => {
    //削除対象のidをセット
    setCustomerToDelete(id);
    //確認ダイアログを開く
    setIsConfirmationDialogOpen(true);
  };

  //ダイアログを閉じる
  const handleCloseDialog = () => {
    //顧客Idとダイアログをリセット
    setCustomerToDelete(null);
    setIsConfirmationDialogOpen(false);
  };

  //削除
  const handleDeleteCOnfirmed = async () => {
    try {
      //Firestoreから削除
      if (customerToDelete !== null) {
        await deleteDoc(doc(db, "customers", customerToDelete));
        //削除が成功したら顧客リストを更新
        const updatedCustomerList = customerList.filter(
          (customer) => customer.id !== customerToDelete
        );
        setCustomerList(updatedCustomerList);
      }
    } catch (error) {
      console.log(error);
    } finally {
      //idとダイアログをリセット
      setCustomerToDelete(null);
      setIsConfirmationDialogOpen(false);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          {customerToDelete && (
            <Dialog
              open={isConfirmationDialogOpen}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">削除の確認</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  本当に削除してもよろしいですか？
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleDeleteCOnfirmed}
                  color="primary"
                  autoFocus
                >
                  はい
                </Button>
                <Button onClick={handleCloseDialog} color="primary">
                  いいえ
                </Button>
              </DialogActions>
            </Dialog>
          )}

          <TableRow>
            <StyledTableCell align="center">No</StyledTableCell>
            <StyledTableCell align="center">営業マン名</StyledTableCell>
            <StyledTableCell align="center">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ marginBottom: 4, fontSize: 14 }}>
                  更新日付
                  <br />
                  ↓以下より選択可能
                </div>
                <TextField
                  select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  variant="outlined"
                  style={{
                    width: "100%",
                    backgroundColor: "black", // 背景色を黒に設定
                  }}
                  InputProps={{
                    style: { color: "white" }, // テキスト色を白に設定
                  }}
                  size="small"
                >
                  <MenuItem value="すべて">すべて</MenuItem>
                  <MenuItem value="1月">1月</MenuItem>
                  <MenuItem value="2月">2月</MenuItem>
                  <MenuItem value="3月">3月</MenuItem>
                  <MenuItem value="4月">4月</MenuItem>
                  <MenuItem value="5月">5月</MenuItem>
                  <MenuItem value="6月">6月</MenuItem>
                  <MenuItem value="7月">7月</MenuItem>
                  <MenuItem value="8月">8月</MenuItem>
                  <MenuItem value="9月">9月</MenuItem>
                  <MenuItem value="10月">10月</MenuItem>
                  <MenuItem value="11月">11月</MenuItem>
                  <MenuItem value="12月">12月</MenuItem>
                </TextField>
              </div>
            </StyledTableCell>

            <StyledTableCell align="center">顧客名</StyledTableCell>
            <StyledTableCell align="center">案件名</StyledTableCell>
            <StyledTableCell align="center">販売商品名</StyledTableCell>
            <StyledTableCell align="center">見込み個数</StyledTableCell>
            <StyledTableCell align="center">見込み収入</StyledTableCell>
            <StyledTableCell align="center">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ marginBottom: 4, fontSize: 14 }}>
                  交渉フラグ
                  <br />
                  ↓以下より選択可能
                </div>
                <TextField
                  select
                  value={selectedNegotiationFlag}
                  onChange={handleNegotiationFlagChange}
                  variant="outlined"
                  style={{
                    width: "100%",
                    backgroundColor: "black", // 背景色を黒に設定
                  }}
                  InputProps={{
                    style: { color: "white" }, // テキスト色を白に設定
                  }}
                  size="small"
                >
                  <MenuItem value="すべて">すべて</MenuItem>
                  <MenuItem value="商談中">商談中</MenuItem>
                  <MenuItem value="獲得">獲得</MenuItem>
                  <MenuItem value="失注">失注</MenuItem>
                </TextField>
              </div>
            </StyledTableCell>
            <StyledTableCell align="center">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ marginBottom: 4, fontSize: 14 }}>
                  獲得月
                  <br />
                  ↓以下より選択可能
                </div>
                <TextField
                  select
                  value={selectedAcquisitionMonth}
                  onChange={handleAcquisitionMonthChange}
                  variant="outlined"
                  style={{
                    width: "100%",
                    backgroundColor: "black", // 背景色を黒に設定
                  }}
                  InputProps={{
                    style: { color: "white" }, // テキスト色を白に設定
                  }}
                  size="small"
                >
                  <MenuItem value="すべて">すべて</MenuItem>
                  <MenuItem value="未獲得">未獲得</MenuItem>
                  <MenuItem value="1月">1月</MenuItem>
                  <MenuItem value="2月">2月</MenuItem>
                  <MenuItem value="3月">3月</MenuItem>
                  <MenuItem value="4月">4月</MenuItem>
                  <MenuItem value="5月">5月</MenuItem>
                  <MenuItem value="6月">6月</MenuItem>
                  <MenuItem value="7月">7月</MenuItem>
                  <MenuItem value="8月">8月</MenuItem>
                  <MenuItem value="9月">9月</MenuItem>
                  <MenuItem value="10月">10月</MenuItem>
                  <MenuItem value="11月">11月</MenuItem>
                  <MenuItem value="12月">12月</MenuItem>
                </TextField>
              </div>
            </StyledTableCell>
            <StyledTableCell align="center">コメント</StyledTableCell>
            <StyledTableCell align="center">編集</StyledTableCell>
            <StyledTableCell align="center">削除</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerList
            .filter((customer) => {
              if (selectedNegotiationFlag === "すべて") {
                return true;
              } else {
                return customer.negotiationflag === selectedNegotiationFlag;
              }
            })
            .filter((customer) => {
              if (selectedMonth === "すべて") {
                return true;
              } else {
                return customer.month === selectedMonth; // データの月が選択された月と一致するかを確認
              }
            })
            .filter((customer) => {
              if (selectedAcquisitionMonth === "すべて") {
                return true;
              } else {
                return customer.acquisitionDate === selectedAcquisitionMonth; // データの月が選択された月と一致するかを確認
              }
            })

            .map((customer, index) => {
              return (
                <StyledTableRow key={customer.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {customer.venderName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {customer.date}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {customer.customerName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {customer.projectTitle}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {customer.productName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Intl.NumberFormat().format(Number(customer.piece))}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Intl.NumberFormat().format(Number(customer.income))}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {customer.negotiationflag}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {customer.acquisitionDate}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {customer.comment}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ m: 1 }}
                      onClick={() => router.push(`/itemedit?id=${customer.id}`)}
                    >
                      編集
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ m: 1 }}
                      onClick={() => handleDeleteClick(customer.id)}
                    >
                      削除
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//@ts-nocheck
"use client";
import { useState, Fragment, useEffect } from "react";
import styles from "./page.module.css";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { db } from "@/firebase/client";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { userFirebaseAuthContext } from "@/firebase/auth";
import PrimarySearchAppBar from "../components/appbar";
import ResponsiveAppBar from "../components/appmenubar";
import BottomAppBar from "../components/footer";

export default function passwordreissue() {
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [productName, setProductName] = useState("");
  const [piece, setPiece] = useState("");
  const [income, setIncome] = useState("");
  const [negotiation, setNegotiation] = useState("");
  const [comment, setComment] = useState("");
  const [missingFields, setMissingFields] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setDate("");
    setCustomerName("");
    setProjectTitle("");
    setProductName("");
    setPiece("");
    setIncome("");
    setNegotiation("");
    setComment("");
  }, []);

  const auth = userFirebaseAuthContext();
  const user = auth.currentUser;
  console.log(user);

  const onClickAdd = async () => {
    const userUID = user?.uid || "";

    // usersドキュメントからteamIdを取得
    const usersRef = doc(collection(db, "users"), userUID);
    const usersDoc = await getDoc(usersRef);
    const teamId = usersDoc.data()?.teamId || "";

    const customersRef = collection(db, "customers");
    const customersDocRef = doc(customersRef);

    // 入力漏れのチェック
    const missingFields = [];
    if (!date) missingFields.push("更新日");
    if (!customerName) missingFields.push("顧客名");
    if (!projectTitle) missingFields.push("案件名");
    if (!productName) missingFields.push("販売商品名");
    if (!piece) missingFields.push("見込個数（月間）");
    if (!income) missingFields.push("見込収入（月間）");
    if (!negotiation) missingFields.push("交渉フラグ");
    if (!comment) missingFields.push("コメント");

    if (missingFields.length > 0) {
      setMissingFields(missingFields);
      return;
    }

    await setDoc(customersDocRef, {
      id: customersDocRef.id,
      date: date,
      customerName: customerName,
      projectTitle: projectTitle,
      productName: productName,
      piece: piece,
      income: income,
      negotiationflag: negotiation,
      comment: comment,
      venderTeamId: teamId,
      venderUid: userUID,
    });

    setSuccess(true);
  };
  return (
    <div className={styles.body}>
      <Fragment>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              minHeight: "80vh",
            }}
          >
            <Box
              bgcolor={"#eeeeee"}
              width={"sm"}
              p={4}
              borderRadius={"md"}
              sx={{
                boxShadow: 8,
                borderRadius: "16px",
              }}
            >
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                案件入力画面
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <TextField
                id="日付"
                label="更新日"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="date"
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                id="顧客名"
                label="顧客名"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <TextField
                id="案件名"
                label="案件名"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="projectTitle"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
              <TextField
                id="販売商品名"
                label="販売商品名"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <TextField
                id="見込個数（月間）"
                label="見込個数（月間）"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="piece"
                value={piece}
                onChange={(e) => setPiece(Number(e.target.value))}
              />
              <TextField
                id="見込収入（月間）"
                label="見込収入（月間）"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="income"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
              <TextField
                select
                id="交渉フラグ"
                label="交渉フラグ"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="negotiation"
                value={negotiation}
                onChange={(e) => setNegotiation(e.target.value)}
              >
                <MenuItem value={"商談中"}>商談中</MenuItem>
                <MenuItem value={"獲得"}>獲得</MenuItem>
                <MenuItem value={"失注"}>失注</MenuItem>
              </TextField>
              <TextField
                id="コメント"
                label="コメント"
                fullWidth
                multiline
                rows={10}
                sx={{ mb: 3 }}
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Grid
                container
                sx={{
                  justifyContent: "start",
                }}
              >
                <Grid item>
                  <Button variant="contained" onClick={onClickAdd}>
                    登録
                  </Button>
                </Grid>
                <Grid item sx={{ ml: 3 }}>
                  <Button variant="contained" href="/home2">
                    キャンセル
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Snackbar
              open={missingFields.length > 0}
              autoHideDuration={6000}
              onClose={() => setMissingFields([])}
            >
              <Alert severity="error" onClose={() => setMissingFields([])}>
                入力漏れの項目名: {missingFields.join(", ")} があります
              </Alert>
            </Snackbar>
            <Snackbar
              open={success}
              autoHideDuration={6000}
              onClose={() => setSuccess(false)}
            >
              <Alert severity="success" onClose={() => setSuccess(false)}>
                案件登録しました
              </Alert>
            </Snackbar>
          </Stack>
        </Container>
      </Fragment>
      <BottomAppBar></BottomAppBar>
    </div>
  );
}

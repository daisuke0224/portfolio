//@ts-nocheck
"use client";
import * as React from "react";
import styles from "./page.module.css";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { db } from "@/firebase/client";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { userFirebaseAuthContext } from "@/firebase/auth";

export default function addminmenutargetvalue() {
  const [targetNumber, setTargetNumber] = React.useState("");
  const [goalAmount, setGoalAmount] = React.useState(0);
  const [missingField, setMissingField] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  const auth = userFirebaseAuthContext();
  const user = auth.currentUser;

  const onClickAdd = async () => {
    if (!user) {
      return;
    }
    //ログインしている本人の情報を取得
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    // 入力漏れのチェック
    if (targetNumber === "") {
      setMissingField(["targetNumber"]);
      return;
    }

    const teamRef = doc(db, "teams", userData.teamId);
    const updateData = { goalAmount: Number(targetNumber) };
    //updateDocはmergeいらない。既にあるものしか更新できない。
    //setDocmerge:trueを入れないと事故が起きる。
    await setDoc(teamRef, updateData, { merge: true });
    setGoalAmount(updateData.goalAmount);
    // 成功時の表示
    setSuccess(true);
  };

  return (
    <div className={styles.body}>
      <React.Fragment>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              height: "60%",
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
                管理者メニュー
              </Typography>
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                営業目標数値
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <TextField
                id="営業目標数値入力"
                label="営業目標数値入力"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="targetNumber"
                value={targetNumber}
                onChange={(e) => setTargetNumber(e.target.value)}
              />
              <Button variant="contained" onClick={onClickAdd}>
                更新
              </Button>
            </Box>
            <Snackbar
              open={missingField.length > 0}
              autoHideDuration={6000}
              onClose={() => setMissingField([])}
            >
              <Alert severity="error" onClose={() => setMissingField}>
                入力漏れをしています
              </Alert>
            </Snackbar>
            <Snackbar
              open={success}
              autoHideDuration={6000}
              onClose={() => setSuccess(false)}
            >
              <Alert severity="success">更新しました</Alert>
            </Snackbar>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}

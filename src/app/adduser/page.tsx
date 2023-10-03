"use client";
import * as React from "react";
import styles from "./page.module.css";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { functions } from "@/firebase/client";
import { httpsCallable } from "firebase/functions";

export default function passwordreissue() {
  const [userName, setUserName] = React.useState("");
  const [mailAddress, setMailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [reenterPassword, setReenterPassword] = React.useState("");

  React.useEffect(() => {
    setUserName("");
    setMailAddress("");
    setPassword("");
    setReenterPassword("");
  }, []);

  const onClickAdd = async () => {
    console.log(userName);
    console.log(mailAddress);
    console.log(password);
    console.log(reenterPassword);

    const functionCall = httpsCallable(functions, "addUser");
    await functionCall({
      userName: userName,
      mailAddress: mailAddress,
      password: password,
    });
  };

  // const initialPassword = {
  //   mailAddress: "",
  //   userName: "",
  //   password: "",
  //   reenterPassword: "",
  // }; //複数の値を保管するためオブジェクトを持っておく
  // const [userPassword, setUserPassword] = React.useState(initialPassword); //2つ保管するのがあるのでinitialPasswordを作る

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target; //ネーム属性のバリューを抽出できる
  //   setUserPassword({ ...userPassword, [name]: value });
  // };

  // const onClickAdd = () => {
  //   console.log(userPassword);
  // };

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
              sx={{ boxShadow: 8, borderRadius: "16px" }}
            >
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                管理者メニュー
              </Typography>
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                ユーザー追加
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <TextField
                id="名前"
                label="名前"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                id="メールアドレス"
                label="メールアドレス"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="mailAddress"
                value={mailAddress}
                onChange={(e) => setMailAddress(e.target.value)}
              />
              <TextField
                id="パスワード"
                label="パスワード"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="パスワードの確認"
                label="パスワードの確認"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="reenterPassword"
                value={reenterPassword}
                onChange={(e) => setReenterPassword(e.target.value)}
              />
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClickAdd}
                  >
                    設定してメールを送信
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" href="/home">
                    キャンセル
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}

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
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { functions } from "@/firebase/client";
import { httpsCallable } from "firebase/functions";
import { useForm } from "react-hook-form";
import BottomAppBar from "../components/footer";
import PrimarySearchAppBar from "../components/appbar";
import ResponsiveAppBar from "../components/appmenubar";

export default function passwordreissue() {
  const [userName, setUserName] = React.useState("");
  const [mailAddress, setMailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [reenterPassword, setReenterPassword] = React.useState("");
  const [missingFields, setMissingFields] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

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
    try {
      const functionCall = httpsCallable(functions, "createUser");
      await functionCall({
        userName: userName,
        mailAddress: mailAddress,
        password: password,
      });
      //ここにonSubmitを入れる！！！！！
      setSuccess(true);
    } catch {
      console.log("error");
    }
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //reenterPasswordの値の監視
  const reenterPasswordValue = watch("reenterPassword", "");

  //パスワードと確認用パスワードが一致するかをチェックする独自のバリデーションルール
  const validatePasswordMatch = (value) => {
    return value === reenterPasswordValue || "パスワードが一致しません";
  };

  return (
    <div className={styles.app}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <ResponsiveAppBar></ResponsiveAppBar>
      <React.Fragment>
        <form onSubmit={handleSubmit(onClickAdd)}>
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
                <Typography
                  variant="h3"
                  textAlign="center"
                  mt={2}
                  sx={{ mb: 3 }}
                >
                  管理者メニュー
                </Typography>
                <Typography
                  variant="h3"
                  textAlign="center"
                  mt={2}
                  sx={{ mb: 3 }}
                >
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
                  {...register("userName", {
                    required: "ユーザー名を入力してください",
                  })}
                  onChange={(e) => setUserName(e.target.value)}
                  helperText={errors.userName?.message}
                  error={!!errors.userName}
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
                  {...register("mailAddress", {
                    required: "メールアドレスを入力してください",
                    pattern: {
                      value: /^[a-z0-9.]+@[a-z]+\.[a-z]+$/,
                      message: "メールアドレスの形式で入力してください。",
                    },
                  })}
                  onChange={(e) => setMailAddress(e.target.value)}
                  helperText={errors.mailAddress?.message}
                  error={!!errors.mailAddress}
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
                  {...register("password", {
                    required: "パスワードを入力してください",
                    minLength: {
                      value: 8,
                      message: "パスワードは8文字以上で入力してください。",
                    },
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText={errors.password?.message}
                  error={!!errors.password}
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
                  {...register("reenterPassword", {
                    required: "パスワードの確認を入力してください",
                    minLength: {
                      value: 8,
                      message: "パスワードは8文字以上で入力してください。",
                    },
                    validate: validatePasswordMatch, //独自のバリデーションルール適用
                  })}
                  onChange={(e) => setReenterPassword(e.target.value)}
                  helperText={errors.reenterPassword?.message}
                  error={!!errors.reenterPassword}
                />
                <Grid
                  container
                  sx={{
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item>
                    <Button variant="contained" color="secondary" type="submit">
                      登録
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" href="/home2">
                      キャンセル
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
              >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                  ユーザーを追加しました
                </Alert>
              </Snackbar>
            </Stack>
          </Container>
        </form>
      </React.Fragment>
      <BottomAppBar></BottomAppBar>
    </div>
  );
}

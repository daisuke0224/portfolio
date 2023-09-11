"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import { Fab, TextField } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const register = () => {
  const [mailAddress, setMailAddress] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [reenterPassword, setReenterPassword] = React.useState("");

  React.useEffect(() => {
    setMailAddress("");
    setUserName("");
    setPassword("");
    setReenterPassword("");
  }, []);

  const onClickAdd = () => {
    console.log(mailAddress);
    console.log(userName);
    console.log(password);
    console.log(reenterPassword);
  };

  return (
    <div className={styles.body}>
      <div className={styles.formContainer}>
        <form>
          <h1>アカウント登録フォーム</h1>
          <hr />
          <div className={styles.uiForm}>
            <TextField
              id="メールアドレス"
              label="メールアドレス"
              variant="outlined"
              fullWidth
              color="secondary"
              name="mailAddress"
              value={mailAddress}
              onChange={(e) => setMailAddress(e.target.value)}
            />
            <TextField
              id="名前"
              label="名前"
              variant="outlined"
              fullWidth
              color="secondary"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              id="パスワード"
              label="パスワード"
              variant="outlined"
              fullWidth
              color="secondary"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="パスワード確認"
              label="パスワード確認"
              variant="outlined"
              fullWidth
              color="secondary"
              name="reenterPassword"
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
            />
            <Fab variant="extended">
              <CameraAltIcon sx={{ mr: 1 }} />
              プロフィール画像ファイル選択
            </Fab>
            <Button variant="contained" fullWidth onClick={onClickAdd}>
              送信
            </Button>
            <Button variant="contained" fullWidth>
              キャンセル
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default register;

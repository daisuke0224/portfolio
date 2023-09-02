"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import { Box, Fab, Input, Paper, TextField } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const register = () => {
  const initialPassword = {
    mailAddress: "",
    userName: "",
    password: "",
    reenterPassword: "",
  }; //複数の値を保管するためオブジェクトを持っておく
  const [userPassword, setUserPassword] = React.useState(initialPassword); //2つ保管するのがあるのでinitialPasswordを作る

  const handleChange = (e: any) => {
    const { name, value } = e.target; //ネーム属性のバリューを抽出できる
    setUserPassword({ ...userPassword, [name]: value });
  };

  const onClickAdd = () => {
    console.log(userPassword);
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
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="名前"
              label="名前"
              variant="outlined"
              fullWidth
              color="secondary"
              name="userName"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="パスワード"
              label="パスワード"
              variant="outlined"
              fullWidth
              color="secondary"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="パスワード確認"
              label="パスワード確認"
              variant="outlined"
              fullWidth
              color="secondary"
              name="reenterPassword"
              onChange={(e) => handleChange(e)}
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

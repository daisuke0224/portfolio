"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "./page.module.css";

export const Login = () => {
  const [mailAddress, setMailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setMailAddress("");
    setPassword("");
  }, []);

  const onClickAdd = () => {
    console.log(mailAddress);
    console.log(password);
  };

  return (
    <div className={styles.body}>
      <div className={styles.formContainer}>
        <form>
          <h1>ログインフォーム</h1>
          <hr />
          <div className={styles.uiForm}>
            <div className={styles.formField}>
              <label>メールアドレス</label>
              <input
                type="text"
                placeholder="メールアドレス"
                name="mailAddress"
                onChange={(e) => setMailAddress(e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label>パスワード</label>
              <input
                type="text"
                placeholder="パスワード"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a href="/">パスワードを忘れた方はこちら</a>
            <Button
              variant="contained"
              className={styles.login}
              onClick={onClickAdd}
            >
              ログイン
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

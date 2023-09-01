"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "./page.module.css";

export const Login = () => {
  const initialPassword = { mailAddress: "", password: "" }; //複数の値を保管するためオブジェクトを持っておく
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
          <h1>ログインフォーム</h1>
          <hr />
          <div className={styles.uiForm}>
            <div className={styles.formField}>
              <label>メールアドレス</label>
              <input
                type="text"
                placeholder="メールアドレス"
                name="mailAddress"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles.formField}>
              <label>パスワード</label>
              <input
                type="text"
                placeholder="パスワード"
                name="password"
                onChange={(e) => handleChange(e)}
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

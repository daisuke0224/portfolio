"use client";
import * as React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter } from 'next/navigation'
import Button from "@mui/material/Button";
import styles from "./page.module.css";

export const Login = () => {
  const router = useRouter()

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const logIn = async () => {
    if (!email) return;
    if (!password) return;

    // ログイン処理：エラー時はとりあえずログを出しておく
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push('/mypage')

    } catch (e) {
      alert("ログインに失敗しました");
      console.error(e);
    }
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
                type="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label>パスワード</label>
              <input
                type="password"
                placeholder="パスワード"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <a href="/">パスワードを忘れた方はこちら</a>
            <Button
              variant="contained"
              className={styles.login}
              onClick={() => {
                logIn();
              }}
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

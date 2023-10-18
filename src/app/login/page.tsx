"use client";
import * as React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import { Divider, Typography } from "@mui/material";

export const Login = () => {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const logIn = async () => {
    if (!email) return;
    if (!password) return;

    // ログイン処理：エラー時はとりあえずログを出しておく
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home2");
      alert("ログインしました");
    } catch (e) {
      alert("ログインに失敗しました");

      console.error(e);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.formContainer}>
        <form>
          <Typography variant="h2" textAlign="center" mt={1} sx={{ mb: 3 }}>
            ログイン
          </Typography>
          <Divider sx={{ mb: 3 }} />
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
            <a href="/passwordreissue">パスワードを忘れた方はこちら</a>
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

//@ts-nocheck
"use client";
import * as React from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { firebaseConfig } from "@/firebase/client";
import { FirebaseError, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextPage } from "next";
import { FC } from "react";
import router from "next/router";
import { useForm } from "react-hook-form";
import { LoginForm } from "@/features/common/types";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import { Fab, TextField } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const SignUp: FC<NextPage> = () => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  };

  const [userName, setUserName] = React.useState("");
  const [mailAddress, setMailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [teamId, setTeamId] = React.useState("");

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const addUser = async () => {
    try {
      const userData = {
        userName: userName,
        teamId: teamId,
        mailAddress: mailAddress,
        password: password,
      };

      const docRef = await addDoc(collection(db, "users"), userData);
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const isValid = async (data: LoginForm) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      updateProfile(userCredential.user, {
        displayName: data.userName,
        TeamId: teamId,
      });
      await sendEmailVerification(userCredential.user);
      addUser();
      router.push("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  return (
    <div className={styles.body}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(isValid)}>
          <h1>アカウント登録フォーム</h1>
          <hr />
          <div className={styles.uiForm}>
            <TextField
              id="名前"
              label="名前"
              variant="outlined"
              fullWidth
              color="secondary"
              name="userName"
              value={userName}
              {...register("userName", {
                required: "ユーザー名を入力してください",
              })}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              {...errors.userName?.message}
            />
            <TextField
              id="チームID"
              label="チームID"
              variant="outlined"
              fullWidth
              color="secondary"
              name="teamId"
              value={teamId}
              {...register("teamId", {
                required: "チームID名を入力してください",
              })}
              type="text"
              onChange={(e) => setTeamId(e.target.value)}
              {...errors.teamId?.message}
            />
            <TextField
              id="メールアドレス"
              label="メールアドレス"
              variant="outlined"
              fullWidth
              color="secondary"
              name="mailAddress"
              value={mailAddress}
              {...register("email", {
                required: "メールアドレスを入力してください",
              })}
              type={"email"}
              onChange={(e) => setMailAddress(e.target.value)}
              {...errors.email?.message}
            />
            <TextField
              id="パスワード"
              label="パスワード"
              variant="outlined"
              fullWidth
              color="secondary"
              name="password"
              value={password}
              {...register("password", {
                required: "パスワードを入力してください",
                minLength: { value: 6, message: "6文字以上入力してください" },
              })}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              {...errors.password?.message}
            />

            <Fab variant="extended">
              <CameraAltIcon sx={{ mr: 1 }} />
              プロフィール画像ファイル選択
            </Fab>
            <Button variant="contained" fullWidth type="submit">
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
export default SignUp;

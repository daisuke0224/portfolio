//@ts-nocheck
"use client";
import * as React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { updateDoc } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextPage } from "next";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginForm } from "@/features/common/types";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import { Divider, TextField, Typography } from "@mui/material";
import { db, auth, storage } from "@/firebase/client";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const SignUp: FC<NextPage> = () => {
  const router = useRouter();
  const [userName, setUserName] = React.useState("");
  const [mailAddress, setMailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [imageFile, setImageFile] = React.useState(""); // 画像ファイルの初期化
  const [teamId, setTeamId] = React.useState(""); // チームの識別子を追加

  const uploadImage = async (imageFile, userUID) => {
    try {
      const storageRef = ref(storage, "profile_images/" + userUID); //ユーザー毎にプロフィール画像を保存する
      await uploadBytes(storageRef, imageFile);

      //アップロードが完了したら、画像のURLを取得
      const downloadURL = await getDownloadURL(storageRef);

      // Firestoreのユーザードキュメントに画像のURLを追加
      const docRef = doc(collection(db, "users"), userUID);
      await updateDoc(docRef, {
        photoURL: downloadURL,
      });

      return downloadURL;
    } catch (error) {
      console.error("画像のアップロードエラー:", error);
      return null;
    }
  };

  //画像選択ボタンのイベントハンドラ
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    console.log(imageFile);
  };

  const addUser = async (uid) => {
    try {
      const userData = {
        isValid: true, //有効なユーザーかどうか
        isTeamAdmin: true, //チームの管理者かどうか
        name: userName, //ユーザー名
        teamId: uid, //チームの識別子
        email: mailAddress, //メールアドレス
        id: uid,
      };

      const docRef = doc(collection(db, "users"), uid);
      await setDoc(docRef, userData);
      console.log("Document written with ID:", docRef.id);
      alert("ユーザーを作成しました");
    } catch (error) {
      console.error("Error adding document:", error);
      alert("ユーザーの作成に失敗しました");
    }
  };

  //ドキュメントのTeamsの内容を追加
  const addTeam = async (uid) => {
    try {
      const teamData = {
        goalAmount: 0,
        id: teamId,
        adminUserId: teamId,
      };

      const teamRef = doc(collection(db, "teams"), teamId);
      await setDoc(teamRef, teamData);
      console.log("Document written with ID:", teamRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const isValid = async (data: LoginForm) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      //ユーザーを作成した後に、ユーザーのUIDを取得
      const userUID = userCredential.user.uid;

      //Firestoreにユーザー情報を保存（UIDも含む）
      await addUser(userUID);
      await addTeam(userUID);

      await updateProfile(userCredential.user, {
        displayName: data.userName,
        TeamId: teamId,
      });

      if (imageFile) {
        const imageUrl = await uploadImage(imageFile, userUID);
        console.log(imageUrl);

        await updateProfile(userCredential.user, {
          photoURL: imageUrl,
        });
      }

      router.push("/home2");
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
    <div className={styles.app}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(isValid)}>
          <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
            管理者アカウント
            <br />
            登録フォーム
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <div className={styles.uiForm}>
            <TextField
              id="名前"
              label="名前"
              variant="outlined"
              fullWidth
              color="secondary"
              name="userName"
              type="text"
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
              name="mailAddress"
              value={mailAddress}
              {...register("email", {
                required: "メールアドレスを入力してください",
                pattern: {
                  value: /^[a-z0-9.]+@[a-z]+\.[a-z]+$/,
                  message: "emailの形式で入力してください。",
                },
              })}
              type={"email"}
              onChange={(e) => setMailAddress(e.target.value)}
              helperText={errors.email?.message}
              error={!!errors.email}
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
                minLength: { value: 8, message: "8文字以上入力してください" },
              })}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              helperText={errors.password?.message}
              error={!!errors.password}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              プロフィール画像ファイル選択
              <VisuallyHiddenInput type="file" onChange={handleImageChange} />
            </Button>
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

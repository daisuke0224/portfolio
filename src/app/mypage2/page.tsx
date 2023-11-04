//@ts-nocheck
"use client";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import {
  Alert,
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/client";
import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getAuth, updateEmail } from "firebase/auth";
import BottomAppBar from "../components/footer";
import PrimarySearchAppBar from "../components/appbar";
import ResponsiveAppBar from "../components/appmenubar";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

const mypage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [userName, setUserName] = React.useState("");
  const [mailAddress, setMailAddress] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState(null);
  const [missingFields, setMissingFields] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  const getUserData = async () => {
    const userRef = doc(db, "users", userId);
    const userData = await getDoc(userRef);
    const user = userData.data();
    console.log(user);
    setUserName(user.name);
    setMailAddress(user.email);
    if (user.photoURL) {
      setPhotoURL(user.photoURL);
    } else {
      const storageRef = ref(storage, `profile_images/${userId}`);
      const photoURL = await getDownloadURL(storageRef);
      setPhotoURL(photoURL);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  // 1. `<Button>`の`onClick`プロパティに、画像ファイルを選択する処理を追加
  let file;

  const handleFileSelect = (event) => {
    file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const photoDataUrl = reader.result;
      const storageRef = ref(storage, `profile_images/${userId}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      setPhotoURL(photoURL);
    };
    reader.readAsDataURL(file);
  };

  const upDateUserData = async () => {
    const userRef = doc(db, "users", userId);

    const missingFields = [];
    if (!userName) missingFields.push("名前");
    if (!mailAddress) missingFields.push("メールアドレス");

    if (missingFields.length > 0) {
      setMissingFields(missingFields);
      return;
    }

    if (photoURL !== null) {
      // Storageに画像を保存する
      const storageRef = ref(storage, `user_photos/${userId}`);
      await uploadBytes(storageRef, file);

      // Storageから画像のURLを取得する
      const photoURL = await getDownloadURL(storageRef);

      await updateDoc(userRef, {
        name: userName,
        email: mailAddress,
        photoURL: photoURL,
      });
    } else {
      await updateDoc(userRef, {
        name: userName,
        email: mailAddress,
        photoURL: null,
      });
    }

    // Authenticationのメールアドレスを更新する
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      await updateEmail(user, mailAddress);
    }
    setSuccess(true);
  };

  return (
    <div className={styles.app}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <ResponsiveAppBar></ResponsiveAppBar>
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
              sx={{
                boxShadow: 8,
                borderRadius: "16px",
              }}
            >
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                マイページ
              </Typography>
              <Divider sx={{ mb: 4 }} />

              <TextField
                id="名前"
                label="名前"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 1 }}
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
                sx={{ mb: 1 }}
                name="mailAddress"
                value={mailAddress}
                onChange={(e) => setMailAddress(e.target.value)}
              />

              <Grid
                container
                sx={{
                  justifyContent: "left",
                  mb: 1,
                  mt: 1,
                }}
              >
                <Grid item>
                  <Avatar src={photoURL} />
                </Grid>
                <Grid item sx={{ ml: 2 }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    プロフィール画像ファイル選択
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileSelect}
                    />
                  </Button>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 3 }}
                onClick={() => upDateUserData()}
              >
                更新
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 3 }}
                href="/home2"
              >
                HOMEに戻る
              </Button>
            </Box>
            <Snackbar
              open={missingFields.length > 0}
              autoHideDuration={6000}
              onClose={() => setMissingFields([])}
            >
              <Alert severity="error" onClose={() => setMissingFields([])}>
                入力漏れの項目名: {missingFields.join(", ")} があります
              </Alert>
            </Snackbar>
            <Snackbar
              open={success}
              autoHideDuration={6000}
              onClose={() => setSuccess(false)}
            >
              <Alert severity="success" onClose={() => setSuccess(false)}>
                マイページを更新しました
              </Alert>
            </Snackbar>
          </Stack>
        </Container>
      </React.Fragment>
      <BottomAppBar></BottomAppBar>
    </div>
  );
};

export default mypage;

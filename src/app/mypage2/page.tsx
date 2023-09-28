//@ts-nocheck
"use client";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Fab,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/client";
import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getAuth, updateEmail } from "firebase/auth";

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

export const mypage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [userName, setUserName] = React.useState("");
  const [mailAddress, setMailAddress] = React.useState("");
  const [teamId, setTeamId] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("/static/images/avatar/1.jpg");

  const getUserData = async () => {
    const userRef = doc(db, "users", userId);
    const userData = await getDoc(userRef);
    const user = userData.data();
    console.log(user);
    setUserName(user.name);
    setMailAddress(user.email);
    setTeamId(user.teamId);
    if (user.photoURL) {
      setPhotoURL(user.photoURL);
    } else {
      setPhotoURL(`/static/images/avatar/${user.name[0].toLowerCase()}.jpg`);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  const upDateUserData = async () => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      name: userName,
      teamId: teamId,
      email: mailAddress, // Firestoreのemailを更新する
    });

    // Authenticationのメールアドレスを更新する
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      await updateEmail(user, mailAddress);
    }

    alert("マイページを更新しました");
  };

  // 1. `<Button>`の`onClick`プロパティに、画像ファイルを選択する処理を追加
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const photoDataUrl = reader.result;
      setPhotoURL(photoDataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.body}>
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
                id="チームID"
                label="チームID"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 1 }}
                name="teamId"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
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
              <Button variant="contained" fullWidth onClick={upDateUserData}>
                更新
              </Button>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default mypage;

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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const mypage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [userName, setUserName] = React.useState("");
  const [mailAddress, setMailAddress] = React.useState("");
  const [teamId, setTeamId] = React.useState("");
  const [uid, setUid] = React.useState(null); // uidを宣言

  React.useEffect(() => {
    const getUserData = async () => {
      // userIdがnullの場合は、getUserData関数を終了する
      if (!userId) {
        return;
      }

      const user = auth.currentUser; // Firebase Authenticationのユーザーオブジェクトを取得
      if (user) {
        const userUid = user.uid; // ユーザーID（UID）を取得
        setUid(userUid); //uidをセット
        const userRef = doc(db, "users", userUid); //uidを使用してドキュメント参照
        const userData = await getDoc(userRef);
        const user = userData.data();
        console.log(user);
        setUserName(user.displayName);
        setMailAddress(user.email);
        setTeamId(user.teamId);
        setImageFile(user.imageFile);
      }
    };
    getUserData();
  }, [userId]);

  const upDateUserData = async () => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      name: userName,
      email: mailAddress,
      teamId: teamId,
    });
    alert("マイページを更新しました");
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
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid item sx={{ ml: 2 }}>
                  <Fab variant="extended">
                    <CameraAltIcon sx={{ mr: 1 }} />
                    プロフィール画像ファイル選択
                  </Fab>
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

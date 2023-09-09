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

export const mypage = () => {
  const [mailAddress, setMailAddress] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [reenterPassword, setReenterPassword] = React.useState("");

  React.useEffect(() => {
    setMailAddress("");
    setUserName("");
    setPassword("");
    setReenterPassword("");
  }, []);

  const onClickAdd = () => {
    console.log(mailAddress);
    console.log(userName);
    console.log(password);
    console.log(reenterPassword);
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
                id="パスワード"
                label="パスワード"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 1 }}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="パスワード確認"
                label="パスワード確認"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 1 }}
                name="reenterPassword"
                value={reenterPassword}
                onChange={(e) => setReenterPassword(e.target.value)}
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
              <Button variant="contained" fullWidth onClick={onClickAdd}>
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

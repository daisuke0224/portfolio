"use client";
import * as React from "react";
import styles from "./page.module.css";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/client";

export default function passwordreissue() {
  const [mailAddress, setMailAddress] = React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    setMailAddress("");
    setMessage("");
  }, []);

  const onClickAdd = () => {
    //FireBaseでパスワード再発行リクエストを送信
    sendPasswordResetEmail(auth, mailAddress)
      .then(() => {
        setMessage(
          "パスワード再発行リンクを送信しました。メールをご確認ください。"
        );
      })
      .catch((error) => {
        setMessage("パスワード再発行に失敗しました。");
        console.error(error);
      });
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
                パスワードの再発行
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h6" textAlign="left" sx={{ mb: 3 }}>
                ご登録いただいたメールアドレスを入力してください。
                新しいパスワードを再発行いたします。
              </Typography>
              <TextField
                id="メールアドレス"
                label="メールアドレス"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="mailAddress"
                value={mailAddress}
                onChange={(e) => setMailAddress(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 3 }}
                onClick={onClickAdd}
              >
                再発行
              </Button>
              {/* メッセージを表示 */}
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ color: "red" }}
              >
                {message}
              </Typography>
              <Button variant="contained" href="/login">
                ログイン画面に戻る
              </Button>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}

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

export default function passwordreissue() {
  const [mailAddress, setMailAddress] = React.useState("");

  React.useEffect(() => {
    setMailAddress("");
  }, []);

  const onClickAdd = () => {
    console.log(mailAddress);
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
              <Button variant="contained">ログイン画面に戻る</Button>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}

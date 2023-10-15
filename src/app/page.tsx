import * as React from "react";
import styles from "./page.module.css";

import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import BottomAppBar from "./components/footer";
export default function passwordreissue() {
  return (
    <div className={styles.app}>
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
              <Typography variant="h4" textAlign="center" mt={2} sx={{ mb: 3 }}>
                営業管理効率化
                <br />
                コミュニケーションサイト
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 0 }}
                href="/signup"
              >
                初めての方はこちら
              </Button>
              <Typography
                variant="body1"
                style={{ fontSize: "13px" }}
                sx={{ mb: 1 }}
              >
                管理者はこちらからアカウント作成をお願いします。
                <br />
                <br />
                ※チームメンバーのアカウント作成は管理者アカウント作成後ログインの上、
                <br />
                管理者メニューよりアカウント作成をお願いいたします。
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 0 }}
                href="/login"
              >
                ログインはこちら
              </Button>
              <Typography variant="body1" style={{ fontSize: "13px" }}>
                営業管理効率化コミュニケーションサイトの
                <br />
                アカウントでWebサイトにログインできます。
              </Typography>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
      <BottomAppBar></BottomAppBar>
    </div>
  );
}

import * as React from "react";
import styles from "./page.module.css";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function passwordreissue() {
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
              sx={{ boxShadow: 8, borderRadius: "16px" }}
            >
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                管理者メニュー
              </Typography>
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                ユーザー追加
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <TextField
                id="名前"
                label="名前"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
              />
              <TextField
                id="メールアドレス"
                label="メールアドレス"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
              />
              <TextField
                id="パスワード"
                label="パスワード"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
              />
              <TextField
                id="パスワードの確認"
                label="パスワードの確認"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
              />
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Grid item>
                  <Button variant="contained" color="secondary">
                    設定してメールを送信
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary">
                    キャンセル
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}

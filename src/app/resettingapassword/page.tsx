"use client";
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
  const [userPassword, setUserPassword] = React.useState("");

  const onChangeUserPassword = (e: any) => setUserPassword(e.target.value);

  const onClickAdd = () => {
    alert(userPassword);
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
              sx={{ boxShadow: 8, borderRadius: "16px" }}
            >
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                パスワードの再設定
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h6" textAlign="left" sx={{ mb: 3 }}>
                新しいパスワードを入力いただき、 パスワードを再設定してください
              </Typography>
              <TextField
                id="パスワード"
                label="パスワード"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                value={userPassword}
                onChange={onChangeUserPassword}
              />
              <TextField
                id="パスワード再入力"
                label="パスワード再入力"
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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClickAdd}
                  >
                    保存する
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary">
                    削除する
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

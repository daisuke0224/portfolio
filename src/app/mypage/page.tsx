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
              />
              <TextField
                id="名前"
                label="名前"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 1 }}
              />
              <TextField
                id="パスワード"
                label="パスワード"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 1 }}
              />
              <TextField
                id="パスワード確認"
                label="パスワード確認"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 1 }}
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
              <Button variant="contained" fullWidth>
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

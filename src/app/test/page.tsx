import * as React from "react";
import styles from "./page.module.css";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveAppBar from "../components/appbar";

export default function passwordreissue() {
  return (
    <div className={styles.body}>
      <ResponsiveAppBar></ResponsiveAppBar>
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
            <Typography
              textTransform="capitalize"
              textAlign="center"
              mt={2}
              sx={{ mb: 3 }}
            >
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
                <Button variant="contained" color="secondary">
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
    </div>
  );
}

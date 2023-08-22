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
                管理者メニュー
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Button variant="contained" fullWidth sx={{ mb: 3 }}>
                ユーザー追加
              </Button>
              <Button variant="contained" fullWidth sx={{ mb: 3 }}>
                ユーザー削除
              </Button>
              <Button variant="contained" fullWidth sx={{ mb: 3 }}>
                営業目標数値入力
              </Button>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}
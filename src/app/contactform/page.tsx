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
  const [count, setCount] = React.useState("");

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
                お問い合わせフォーム
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <TextField
                id="お名前（必須）"
                label="お名前（必須）"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
              />
              <TextField
                id="E-mailアドレス（必須）"
                label="E-mailアドレス（必須）"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
              />
              <TextField
                id="お問合せ内容（必須）"
                label="お問合せ内容（必須）"
                fullWidth
                multiline
                rows={10}
                sx={{ mb: 3 }}
              />
              <Button variant="contained">送信</Button>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}

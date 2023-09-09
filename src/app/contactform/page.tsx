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
  const [name, setName] = React.useState("");
  const [mailaddress, setMailAddress] = React.useState("");
  const [inquireyDetails, setInquireyDetails] = React.useState("");

  React.useEffect(() => {
    setName("");
    setMailAddress("");
    setInquireyDetails("");
  }, []);

  const onClickAdd = () => {
    console.log(name);
    console.log(mailaddress);
    console.log(inquireyDetails);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="E-mailアドレス（必須）"
                label="E-mailアドレス（必須）"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                value={mailaddress}
                onChange={(e) => setMailAddress(e.target.value)}
              />
              <TextField
                id="お問合せ内容（必須）"
                label="お問合せ内容（必須）"
                fullWidth
                multiline
                rows={10}
                sx={{ mb: 3 }}
                value={inquireyDetails}
                onChange={(e) => setInquireyDetails(e.target.value)}
              />
              <Button variant="contained" onClick={onClickAdd}>
                送信
              </Button>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}

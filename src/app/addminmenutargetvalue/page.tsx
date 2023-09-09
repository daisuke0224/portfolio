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

export default function addminmenutargetvalue() {
  const [targetNumber, setTargetNumber] = React.useState("");

  React.useEffect(() => {
    setTargetNumber("");
  }, []);

  const onClickAdd = () => {
    console.log(targetNumber);
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
                管理者メニュー
              </Typography>
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                営業目標数値
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <TextField
                id="営業目標数値入力"
                label="営業目標数値入力"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="targetNumber"
                onChange={(e) => setTargetNumber(e.target.value)}
              />
              <Button variant="contained" onClick={onClickAdd}>
                更新
              </Button>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}

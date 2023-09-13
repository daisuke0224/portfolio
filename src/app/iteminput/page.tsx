"use client";
import { useState, Fragment, useEffect } from "react";
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
import ComboBox from "../components/autocomplete";

export default function passwordreissue() {
  const [customerName, setCustomerName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [productName, setProductName] = useState("");
  const [piece, setPiece] = useState("");
  const [income, setIncome] = useState("");
  const [negotiation, setNegotiation] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setCustomerName("");
    setProjectTitle("");
    setProductName("");
    setPiece("");
    setIncome("");
    setNegotiation("");
    setComment("");
  }, []);

  const onClickAdd = () => {
    console.log(customerName);
    console.log(projectTitle);
    console.log(productName);
    console.log(piece);
    console.log(income);
    console.log(negotiation);
    console.log(comment);
  };

  return (
    <div className={styles.body}>
      <Fragment>
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
                案件入力画面
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <TextField
                id="顧客名"
                label="顧客名"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <TextField
                id="案件名"
                label="案件名"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="projectTitle"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
              <TextField
                id="販売商品名"
                label="販売商品名"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <TextField
                id="見込個数（月間）"
                label="見込個数（月間）"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="piece"
                value={piece}
                onChange={(e) => setPiece(e.target.value)}
              />
              <TextField
                id="見込収入（月間）"
                label="見込収入（月間）"
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
                name="income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
              <ComboBox />
              <TextField
                id="コメント"
                label="コメント"
                fullWidth
                multiline
                rows={10}
                sx={{ mb: 3 }}
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Grid
                container
                sx={{
                  justifyContent: "start",
                }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClickAdd}
                  >
                    登録
                  </Button>
                </Grid>
                <Grid item sx={{ ml: 3 }}>
                  <Button variant="contained" color="secondary" href="/home">
                    キャンセル
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Fragment>
    </div>
  );
}

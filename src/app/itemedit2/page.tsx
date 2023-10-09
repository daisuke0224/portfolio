//@ts-nocheck
"use client";
import { useState, Fragment, useEffect } from "react";
import styles from "./page.module.css";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { db } from "@/firebase/client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import PrimarySearchAppBar from "../components/appbar";
import ResponsiveAppBar from "../components/appmenubar";
import BottomAppBar from "../components/footer";

export default function passwordreissue() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("id");

  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [productName, setProductName] = useState("");
  const [piece, setPiece] = useState("");
  const [income, setIncome] = useState("");
  const [negotiation, setNegotiation] = useState("");
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);

  const getCustomerData = async () => {
    const costomerRef = doc(db, "customers", customerId);
    const costomerData = await getDoc(costomerRef);
    const costomer = costomerData.data();
    console.log(costomer);
    setDate(costomer.date);
    setCustomerName(costomer.customerName);
    setProjectTitle(costomer.projectTitle);
    setProductName(costomer.productName);
    setPiece(costomer.piece);
    setIncome(costomer.income);
    setNegotiation(costomer.negotiationflag);
    setComment(costomer.comment);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const upDateCustomerData = async () => {
    const customerRef = doc(db, "customers", customerId);

    await updateDoc(customerRef, {
      date: date,
      customerName: customerName,
      projectTitle: projectTitle,
      productName: productName,
      piece: piece,
      income: income,
      negotiation: negotiation,
      comment: comment,
    });
    setSuccess(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    validateCriteriaMode: "onSubmit", // フォームの値が変更されたときにのみバリデーションを実行
  });

  return (
    <div className={styles.app}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Fragment>
        <form form onSubmit={handleSubmit(upDateCustomerData)}>
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                minHeight: "80vh",
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
                <Typography
                  variant="h3"
                  textAlign="center"
                  mt={2}
                  sx={{ mb: 3 }}
                >
                  案件編集
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  id="日付"
                  label="更新日"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  name="date"
                  value={date}
                  {...register("date", {
                    required: "日付を入力してください",
                  })}
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  helperText={errors.projectTitle?.message}
                  error={!!errors.projectTitle}
                />
                <TextField
                  id="顧客名"
                  label="顧客名"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  name="customerName"
                  value={customerName}
                  {...register("customerName", {
                    required: "顧客名を入力してください",
                  })}
                  onChange={(e) => setCustomerName(e.target.value)}
                  helperText={errors.customerName?.message}
                  error={!!errors.customerName}
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
                  {...register("projectTitle", {
                    required: "案件名を入力してください",
                  })}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  helperText={errors.projectTitle?.message}
                  error={!!errors.projectTitle}
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
                  {...register("productName", {
                    required: "販売商品名を入力してください",
                  })}
                  onChange={(e) => setProductName(e.target.value)}
                  helperText={errors.productName?.message}
                  error={!!errors.productName}
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
                  {...register("piece", {
                    required: "見込個数（月間）を入力してください",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "見込個数（月間）の形式が正しくありません。",
                    },
                  })}
                  onChange={(e) => setPiece(e.target.value)}
                  helperText={errors.piece?.message}
                  error={!!errors.piece}
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
                  {...register("income", {
                    required: "見込収入（月間）を入力してください",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "見込収入（月間）の形式が正しくありません。",
                    },
                  })}
                  onChange={(e) => setIncome(e.target.value)}
                  helperText={errors.income?.message}
                  error={!!errors.income}
                />
                <TextField
                  select
                  id="交渉フラグ"
                  label="交渉フラグ"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  name="negotiation"
                  value={negotiation}
                  {...register("negotiation", {
                    required: "交渉フラグを入力してください",
                  })}
                  onChange={(e) => setNegotiation(e.target.value)}
                  helperText={errors.negotiation?.message}
                  error={!!errors.negotiation}
                >
                  <MenuItem value={"商談中"}>商談中</MenuItem>
                  <MenuItem value={"獲得"}>獲得</MenuItem>
                  <MenuItem value={"失注"}>失注</MenuItem>
                </TextField>
                <TextField
                  id="コメント"
                  label="コメント"
                  fullWidth
                  multiline
                  rows={10}
                  sx={{ mb: 3 }}
                  name="comment"
                  value={comment}
                  {...register("comment", {
                    required: "コメントを入力してください",
                  })}
                  onChange={(e) => setComment(e.target.value)}
                  helperText={errors.comment?.message}
                  error={!!errors.comment}
                />

                <Grid
                  container
                  sx={{
                    justifyContent: "start",
                  }}
                >
                  <Grid item>
                    <Button variant="contained" color="secondary" type="submit">
                      更新
                    </Button>
                  </Grid>
                  <Grid item sx={{ ml: 3 }}>
                    <Button variant="contained" color="secondary" href="/home2">
                      キャンセル
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
              >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                  案件を更新しました
                </Alert>
              </Snackbar>
            </Stack>
          </Container>
        </form>
      </Fragment>
      <BottomAppBar></BottomAppBar>
    </div>
  );
}

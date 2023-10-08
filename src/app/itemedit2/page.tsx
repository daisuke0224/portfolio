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

  const [success, setSuccess] = useState(false);

  const getCustomerData = async () => {
    const costomerRef = doc(db, "customers", customerId);
    const costomerData = await getDoc(costomerRef);
    const costomer = costomerData.data();
    console.log(costomer);
    setValue(costomer.date);
    setValue(costomer.customerName);
    setValue(costomer.projectTitle);
    setValue(costomer.productName);
    setValue(costomer.piece);
    setValue(costomer.income);
    setValue(costomer.negotiationflag);
    setValue(costomer.comment);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const upDateCustomerData = async () => {
    const customerRef = doc(db, "customers", customerId);

    await updateDoc(customerRef, {
      date: getValues("date"),
      customerName: getValues("customerName"),
      projectTitle: getValues("projectTitle"),
      productName: getValues("productName"),
      piece: getValues("piece"),
      income: getValues("income"),
      negotiation: getValues("negotiation"),
      comment: getValues("comment"),
    });
    setSuccess(true);
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
      customerName: "",
      projectTitle: "",
      productName: "",
      piece: "",
      income: "",
      negotiation: "",
      comment: "",
    },
  });

  return (
    <div className={styles.app}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Fragment>
        <form onSubmit={handleSubmit(upDateCustomerData)}>
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
                  {...register("date", {
                    required: "日付を入力してください",
                  })}
                  value={getValues("date")} // 値を取得
                  onChange={(e) => setValue("date", e.target.value)} // 値を変更
                  helperText={errors.date?.message}
                  error={!!errors.date}
                />
                <TextField
                  id="顧客名"
                  label="顧客名"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  value={getValues("customerName")} // 値を取得
                  {...register("customerName", {
                    required: "顧客名を入力してください",
                  })}
                  onChange={(e) => setValue("customerName", e.target.value)} // 値を変更
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
                  value={getValues("projectTitle")} // 値を取得
                  {...register("projectTitle", {
                    required: "案件名を入力してください",
                  })}
                  onChange={(e) => setValue("projectTitle", e.target.value)} // 値を変更
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
                  value={getValues("productName")} // 値を取得
                  {...register("productName", {
                    required: "販売商品名を入力してください",
                  })}
                  onChange={(e) => setValue("productName", e.target.value)} // 値を変更
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
                  value={getValues("piece")} // 値を取得
                  {...register("piece", {
                    required: "見込個数（月間）を入力してください",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "見込個数（月間）の形式が正しくありません。",
                    },
                  })}
                  onChange={(e) => setValue("piece", e.target.value)} // 値を変更
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
                  value={getValues("income")} // 値を取得
                  {...register("income", {
                    required: "見込収入（月間）を入力してください",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "見込収入（月間）の形式が正しくありません。",
                    },
                  })}
                  onChange={(e) => setValue("income", e.target.value)} // 値を変更
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
                  value={getValues("negotiation")} // 値を取得
                  {...register("negotiation", {
                    required: "交渉フラグを入力してください",
                  })}
                  onChange={(e) => setValue("negotiation", e.target.value)} // 値を変更
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
                  value={getValues("comment")} // 値を取得
                  {...register("comment", {
                    required: "コメントを入力してください",
                  })}
                  onChange={(e) => setValue("comment", e.target.value)} // 値を変更
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

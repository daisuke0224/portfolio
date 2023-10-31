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
    setValue("date", costomer.date);
    setValue("customerName", costomer.customerName);
    setValue("projectTitle", costomer.projectTitle);
    setValue("productName", costomer.productName);
    setValue("piece", costomer.piece);
    setValue("income", costomer.income);
    setValue("negotiationflag", costomer.negotiationflag);
    setValue("acquisitionDate", costomer.acquisitionDate);
    setValue("comment", costomer.comment);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const upDateCustomerData = async () => {
    const customerRef = doc(db, "customers", customerId);

    // 1. dateから年と月の情報を抽出
    const date = getValues("date"); // フォームから日付を取得
    const dateParts = date.split("-"); // dateを年と月に分割
    const month = dateParts[1] + "月";

    await updateDoc(customerRef, {
      date: getValues("date"),
      customerName: getValues("customerName"),
      projectTitle: getValues("projectTitle"),
      productName: getValues("productName"),
      piece: Number(getValues("piece")),
      income: Number(getValues("income")),
      negotiationflag: getValues("negotiationflag"),
      acquisitionDate: getValues("acquisitionDate"),
      comment: getValues("comment"),
      month: month,
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
      negotiationflag: "",
      acquisitionDate: "",
      comment: "",
      month: "",
    },
  });

  useEffect(() => {
    setValue("date", getValues("date"));
    setValue("customerName", getValues("customerName"));
    setValue("projectTitle", getValues("projectTitle"));
    setValue("productName", getValues("productName"));
    setValue("piece", getValues("piece"));
    setValue("income", getValues("income"));
    setValue("negotiationflag", getValues("negotiationflag"));
    setValue("acquisitionDate", getValues("acquisitionDate"));
    setValue("comment", getValues("comment"));
    setValue("month", getValues("month"));
  }, [getValues]);

  return (
    <div className={styles.app}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Fragment>
        <form onSubmit={handleSubmit(upDateCustomerData)}>
          <div style={{ margin: "20px" }}></div>
          <Container sx={{}}>
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
                  onChange={(e) => setValue("date", e.target.value)} // 値を変更
                  helperText={errors.date?.message}
                  error={!!errors.date}
                  focused
                />
                <TextField
                  id="顧客名"
                  label="顧客名"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  {...register("customerName", {
                    required: "顧客名を入力してください",
                  })}
                  onChange={(e) => setValue("customerName", e.target.value)} // 値を変更
                  helperText={errors.customerName?.message}
                  error={!!errors.customerName}
                  focused
                />
                <TextField
                  id="案件名"
                  label="案件名"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  {...register("projectTitle", {
                    required: "案件名を入力してください",
                  })}
                  onChange={(e) => setValue("projectTitle", e.target.value)} // 値を変更
                  helperText={errors.projectTitle?.message}
                  error={!!errors.projectTitle}
                  focused
                />
                <TextField
                  id="販売商品名"
                  label="販売商品名"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  {...register("productName", {
                    required: "販売商品名を入力してください",
                  })}
                  onChange={(e) => setValue("productName", e.target.value)} // 値を変更
                  helperText={errors.productName?.message}
                  error={!!errors.productName}
                  focused
                />
                <TextField
                  id="見込個数（月間）"
                  label="見込個数（月間）"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
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
                  focused
                />
                <TextField
                  id="見込収入（月間）"
                  label="見込収入（月間）"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
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
                  focused
                />
                <TextField
                  select
                  id="交渉フラグ"
                  label="交渉フラグ"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  {...register("negotiationflag", {
                    required: "交渉フラグを入力してください",
                  })}
                  onChange={(e) => setValue("negotiationflag", e.target.value)} // 値を変更
                  helperText={errors.negotiationflag?.message}
                  error={!!errors.negotiationflag}
                  focused
                >
                  <MenuItem value={"商談中"}>商談中</MenuItem>
                  <MenuItem value={"獲得"}>獲得</MenuItem>
                  <MenuItem value={"失注"}>失注</MenuItem>
                </TextField>
                <TextField
                  select
                  id="獲得月"
                  label="獲得日"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  {...register("acquisitionDate", {
                    required: "獲得日項目を入力してください",
                  })}
                  onChange={(e) => setValue("acquisitionDate", e.target.value)} // 値を変更(e.target.value)}
                  helperText={errors.acquisitionDate?.message}
                  error={!!errors.acquisitionDate}
                  focused
                >
                  <MenuItem value={"未獲得"}>未獲得</MenuItem>
                  <MenuItem value={"1月"}>1月</MenuItem>
                  <MenuItem value={"2月"}>2月</MenuItem>
                  <MenuItem value={"3月"}>3月</MenuItem>
                  <MenuItem value={"4月"}>4月</MenuItem>
                  <MenuItem value={"5月"}>5月</MenuItem>
                  <MenuItem value={"6月"}>6月</MenuItem>
                  <MenuItem value={"7月"}>7月</MenuItem>
                  <MenuItem value={"8月"}>8月</MenuItem>
                  <MenuItem value={"9月"}>9月</MenuItem>
                  <MenuItem value={"10月"}>10月</MenuItem>
                  <MenuItem value={"11月"}>11月</MenuItem>
                  <MenuItem value={"12月"}>12月</MenuItem>
                </TextField>
                <TextField
                  id="コメント"
                  label="コメント"
                  fullWidth
                  multiline
                  rows={10}
                  color="secondary"
                  sx={{ mb: 3 }}
                  {...register("comment", {
                    required: "コメントを入力してください",
                  })}
                  onChange={(e) => setValue("comment", e.target.value)} // 値を変更
                  helperText={errors.comment?.message}
                  error={!!errors.comment}
                  focused
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
      <div style={{ margin: "20px" }}></div>

      <BottomAppBar></BottomAppBar>
    </div>
  );
}

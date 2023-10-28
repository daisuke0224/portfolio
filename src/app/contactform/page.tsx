"use client";
import * as React from "react";
import styles from "./page.module.css";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PrimarySearchAppBar from "../components/appbar";
import ResponsiveAppBar from "../components/appmenubar";
import BottomAppBar from "../components/footer";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/client";
import { useForm } from "react-hook-form";

export default function contactForm() {
  const [name, setName] = React.useState("");
  const [mailaddress, setMailAddress] = React.useState("");
  const [inquireyDetails, setInquireyDetails] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [mailAddressError, setMailAddressError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    setName("");
    setMailAddress("");
    setInquireyDetails("");
  }, []);

  const onClickAdd = async () => {
    const data = {
      name: name,
      email: mailaddress,
      comment: inquireyDetails,
      sentAt: 0,
    };

    try {
      // Firestoreのcontactsコレクションにデータを追加
      const docRef = await addDoc(collection(db, "contact"), data);
      console.log("Document added with ID: ", docRef.id);
      setSuccess(true);

      //データの送信が成功した場合、フォームをクリア
      setName("");
      setMailAddress("");
      setInquireyDetails("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.app}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <ResponsiveAppBar></ResponsiveAppBar>
      <React.Fragment>
        <form onSubmit={handleSubmit(onClickAdd)}>
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
                <Typography
                  variant="h3"
                  textAlign="center"
                  mt={2}
                  sx={{ mb: 3 }}
                >
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
                  {...register("name", {
                    required: "お名前を入力してください",
                  })}
                  onChange={(e) => setName(e.target.value)}
                  helperText={errors.name?.message as React.ReactNode}
                  error={!!errors.name}
                />
                <TextField
                  id="E-mailアドレス（必須）"
                  label="E-mailアドレス（必須）"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 3 }}
                  value={mailaddress}
                  {...register("mailaddress", {
                    required: "E-mailアドレスを入力してください",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "正しいE-mailアドレスを入力してください",
                    },
                  })}
                  onChange={(e) => setMailAddress(e.target.value)}
                  helperText={errors.mailaddress?.message as React.ReactNode}
                  error={!!errors.mailaddress}
                />
                <TextField
                  id="お問合せ内容（必須）"
                  label="お問合せ内容（必須）"
                  fullWidth
                  multiline
                  rows={10}
                  sx={{ mb: 3 }}
                  value={inquireyDetails}
                  {...register("inquireyDetails", {
                    required: "お問合せ内容を入力してください",
                  })}
                  onChange={(e) => setInquireyDetails(e.target.value)}
                  helperText={
                    errors.inquireyDetails?.message as React.ReactNode
                  }
                  error={!!errors.inquireyDetails}
                />
                <Button type="submit" variant="contained">
                  送信
                </Button>
              </Box>
              <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
              >
                <Alert onClose={() => setSuccess(false)} severity="success">
                  お問合せを送信しました。
                </Alert>
              </Snackbar>
            </Stack>
          </Container>
        </form>
      </React.Fragment>
      <BottomAppBar></BottomAppBar>
    </div>
  );
}

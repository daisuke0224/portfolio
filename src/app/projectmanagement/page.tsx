"use client";
import { Fragment, useEffect, useState } from "react";
import styles from "./page.module.css";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import Customization from "../components/customization";

export default function passwordreissue() {
  return (
    <div className={styles.body}>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "120vh",
        }}
      >
        <Box
          bgcolor={"#eeeeee"}
          width={"md"}
          p={4}
          borderRadius={"md"}
          sx={{
            boxShadow: 8,
            borderRadius: "16px",
          }}
        >
          <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
            案件一覧
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Customization />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="secondary" href="/home2">
              戻る
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

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
import PrimarySearchAppBar from "../components/appbar";
import ResponsiveAppBar from "../components/appmenubar";
import BottomAppBar from "../components/footer";

export default function passwordreissue() {
  return (
    <div className={styles.app}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div style={{ margin: "20px" }}></div>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
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
      <div style={{ margin: "20px" }}></div>
      <BottomAppBar></BottomAppBar>
    </div>
  );
}

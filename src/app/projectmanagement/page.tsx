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
} from "@mui/material";
import Customization from "../components/customization";

export default function passwordreissue() {
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
            height: "120vh",
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
              案件一覧
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Customization />

            <Button variant="contained" color="secondary">
              戻る
            </Button>
          </Box>
        </Container>
      </Fragment>
    </div>
  );
}

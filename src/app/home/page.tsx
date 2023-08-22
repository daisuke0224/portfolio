"use client";
import * as React from "react";
import styles from "./page.module.css";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import PrimarySearchAppBar from "../components/appbar";
import ResponsiveAppBar from "../components/appmenubar";
import TwoSimplePieChart from "../components/piecharts";
import BottomAppBar from "../components/footer";
import StackedBarChart from "../components/barscharts";
import NumberOfProjecfts from "../components/numberofprojectscharts";
import FullWidthGrid from "../components/achievements";
import FixedContainer from "../components/sidebar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function passwordreissue() {
  return (
    <div className={styles.body}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box sx={{ display: "flex" }}>
        <Grid container>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid xs={6} md={8}>
              <Item>
                <FullWidthGrid></FullWidthGrid>
              </Item>
            </Grid>

            <h2>獲得済みと予定</h2>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2}>
                <Grid xs={6} md={3}>
                  <Item>
                    <TwoSimplePieChart></TwoSimplePieChart>
                  </Item>
                </Grid>
                <Grid xs={6} md={5}>
                  <Item>
                    <StackedBarChart></StackedBarChart>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <h2>現在の交渉中案件</h2>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2}>
                <Grid xs={6} md={4}>
                  <Item>
                    <h2>案件数</h2>
                    <NumberOfProjecfts></NumberOfProjecfts>
                  </Item>
                </Grid>
                <Grid xs={6} md={4}>
                  <Item>
                    <h2>案件金額</h2>
                    <StackedBarChart></StackedBarChart>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <h2>チャット</h2>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2}>
                <Grid md={8}>
                  <Item></Item>
                </Grid>
              </Grid>
            </Box>
            <h2>タスク管理</h2>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2}>
                <Grid md={8}>
                  <Item></Item>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Box sx={{ overflow: "auto" }}>
          <FixedContainer></FixedContainer>
        </Box>
      </Box>

      <BottomAppBar></BottomAppBar>
    </div>
  );
}

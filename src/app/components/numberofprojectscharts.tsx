//@ts-nocheck

"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const aData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function StackedBarChart() {
  return (
    <Box display="flex" justifyContent="center">
      <BarChart
        width={600}
        height={400}
        series={[
          { data: pData, label: "獲得", id: "pvId", stack: "total" },
          { data: uData, label: "交渉中", id: "uvId", stack: "total" },
          { data: aData, label: "失注", id: "avId", stack: "total" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </Box>
  );
}

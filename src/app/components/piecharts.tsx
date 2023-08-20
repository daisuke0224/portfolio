"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data2 = [
  { label: "Group A", value: 2400 },
  { label: "Group B", value: 4567 },
  { label: "Group C", value: 1398 },
  { label: "Group D", value: 9800 },
  { label: "Group E", value: 3908 },
  { label: "Group F", value: 4800 },
];

export default function TwoSimplePieChart() {
  return (
    <PieChart
      series={[
        {
          data: data2,
          innerRadius: 60,
          outerRadius: 130,
        },
      ]}
      height={300}
      legend={{ hidden: true }}
    />
  );
}

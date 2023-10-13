//@ts-nocheck
"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
const CustomPieChart = ({ data, innerRadius, outerRadius, centerText }) => {
  const centerTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-90%, -50%)",
    textAlign: "center",
    whiteSpace: "pre-line", // 改行を有効にする
    fontSize: "20px",
  };

  return (
    <div style={{ position: "relative" }}>
      <PieChart
        series={[
          {
            data,
            innerRadius,
            outerRadius,
          },
        ]}
        height={440}
        legend={{ hidden: true }}
      />
      <div style={centerTextStyle}>{centerText}</div>
    </div>
  );
};

export default function TwoSimplePieChart() {
  const data2 = [
    { label: "獲得", value: 2400 },
    { label: "交渉中", value: 4567 },
  ];

  return (
    <CustomPieChart
      data={data2}
      innerRadius={90}
      outerRadius={180}
      centerText={`獲得: ${data2[0].value}
      交渉中: ${data2[1].value}`}
      conterText={`獲得: ${data2[0].value} 交渉中: ${data2[1].value}`}
    />
  );
}

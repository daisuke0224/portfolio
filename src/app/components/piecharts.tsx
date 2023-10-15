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
        height={400}
        legend={{ hidden: true }}
      />
      <div style={centerTextStyle}>{centerText}</div>
    </div>
  );
};

export default function TwoSimplePieChart({ itemdatas }) {
  console.log(itemdatas);
  let inprogressItemsTotalValue = 0;
  let completedItemsTotalValue = 0;
  itemdatas.map((itemdata) => {
    if (itemdata.label === "商談中") {
      inprogressItemsTotalValue += Number(itemdata.value);
    } else if (itemdata.label === "獲得") {
      completedItemsTotalValue += Number(itemdata.value);
    }
  });

  const pieChartData = [
    {
      label: "獲得",
      value: completedItemsTotalValue,
    },
    {
      label: "商談中",
      value: inprogressItemsTotalValue,
    },
  ];

  return (
    <CustomPieChart
      data={pieChartData}
      innerRadius={90}
      outerRadius={180}
      centerText={`獲得: ${pieChartData[0].value}
      商談中: ${pieChartData[1].value}`}
      conterText={`獲得: ${pieChartData[0].value} 商談中: ${pieChartData[1].value}`}
    />
  );
}

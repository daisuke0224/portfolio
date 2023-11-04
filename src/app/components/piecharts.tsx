//@ts-nocheck
"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
const CustomPieChart = ({ data, innerRadius, outerRadius, centerText }) => {
  const centerTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-80%, -50%)",
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

export default function TwoSimplePieChart({ itemdatas }) {
  // console.log(itemdatas);
  let inprogressItemsTotalValue = 0;
  let completedItemsTotalValue = 0;
  itemdatas.map((itemdata) => {
    if (itemdata.label === "商談中") {
      inprogressItemsTotalValue += Number(itemdata.value);
    } else if (itemdata.label === "獲得") {
      completedItemsTotalValue += Number(itemdata.value);
    }
  });

  // 数値をカンマ区切りの文字列に変換
  const completedItemsTotalValueString =
    completedItemsTotalValue.toLocaleString();
  const inprogressItemsTotalValueString =
    inprogressItemsTotalValue.toLocaleString();

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
      centerText={`獲得: ${completedItemsTotalValueString}
      商談中: ${inprogressItemsTotalValueString}`}
      conterText={`獲得: ${completedItemsTotalValueString} 商談中: ${inprogressItemsTotalValueString}`}
    />
  );
}

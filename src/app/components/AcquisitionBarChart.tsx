//@ts-nocheck
"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";
import { db } from "@/firebase/client";
import { collection, getDocs, query, where } from "firebase/firestore";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function AcquisitionBarChart({ itemdatas, teamId }) {
  console.log(itemdatas);
  // const [completedData, setCompletedData] = React.useState([]);
  // const [inprogressData, setInprogressData] = React.useState([]);
  // const [memberNames, setMemberNames] = React.useState([]);

  // const fetch = async () => {
  //   console.log(completedData);
  //   console.log(inprogressData);
  //   console.log(memberNames);
  //   if (!teamId) {
  //     return;
  //   }
  //   if (!itemdatas) {
  //     return;
  //   }
  //   console.log(teamId);
  //   const teamMemberDatasQuery = query(
  //     collection(db, "users"),
  //     where("teamId", "==", teamId)
  //   );
  //   const teamMemberDatasSnapshot = await getDocs(teamMemberDatasQuery);
  //   const teamMemberDatas = teamMemberDatasSnapshot.docs.map((doc) =>
  //     doc.data()
  //   );
  //   console.log(teamMemberDatas);
  //   const necessaryTeamMemberDatas = teamMemberDatas.map((teamMemberData) => {
  //     return {
  //       name: teamMemberData.name,
  //       id: teamMemberData.id,
  //       inprogressItemsTotalValue: 0,
  //       completedItemsTotalValue: 0,
  //     };
  //   });
  //   itemdatas.map((itemdata) => {
  //     necessaryTeamMemberDatas.map((necessaryTeamMemberData) => {
  //       if (necessaryTeamMemberData.id === itemdata.venderUid) {
  //         if (itemdata.label === "商談中") {
  //           necessaryTeamMemberData.inprogressItemsTotalValue += Number(
  //             itemdata.value
  //           );
  //         } else if (itemdata.label === "獲得") {
  //           necessaryTeamMemberData.completedItemsTotalValue += Number(
  //             itemdata.value
  //           );
  //         }
  //       }
  //     });
  //   });
  //   const i_data = necessaryTeamMemberDatas.map((necessaryTeamMemberData) => {
  //     return necessaryTeamMemberData.inprogressItemsTotalValue;
  //   });
  //   setInprogressData(i_data);

  //   const c_data = necessaryTeamMemberDatas.map((necessaryTeamMemberData) => {
  //     return necessaryTeamMemberData.completedItemsTotalValue;
  //   });
  //   setCompletedData(c_data);

  //   const m_names = necessaryTeamMemberDatas.map((necessaryTeamMemberData) => {
  //     return necessaryTeamMemberData.name;
  //   });
  //   setMemberNames(m_names);
  // };

  // React.useEffect(() => {
  // fetch();
  //   console.log(completedData);
  //   console.log(inprogressData);
  //   console.log(memberNames);
  // }, [itemdatas, teamId]);

  return (
    <Box display="flex" justifyContent="center">
      <BarChart
        width={600}
        height={400}
        series={[
          { data: pData, label: "獲得", id: "pvId", stack: "total" },
          { data: uData, label: "商談中", id: "uvId", stack: "total" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </Box>
  );
}

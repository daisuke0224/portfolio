//@ts-nocheck
"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/client";

export default function StackedBarChart({ itemdatas, teamId }) {
  // console.log(itemdatas, teamId);
  const [completedData, setCompletedData] = React.useState([]);
  const [inprogressData, setInprogressData] = React.useState([]);
  const [lostOrderData, setLostOrderData] = React.useState([]);
  const [memberNames, setMemberNames] = React.useState([]);
  // console.log(completedData);
  // console.log(inprogressData);
  // console.log(lostOrderData);
  // console.log(memberNames);

  React.useEffect(() => {
    const fetch = async () => {
      if (!teamId || !itemdatas) {
        return;
      }
      const teamMemberDatasQuery = query(
        collection(db, "users"),
        where("teamId", "==", teamId)
      );
      const teamMemberDatasSnapshot = await getDocs(teamMemberDatasQuery);
      const teamMemberDatas = teamMemberDatasSnapshot.docs.map((doc) =>
        doc.data()
      );
      const necessaryTeamMemberDatas = teamMemberDatas.map((teamMemberData) => {
        return {
          name: teamMemberData.name,
          id: teamMemberData.id,
          inprogressItemsTotalValue: 0,
          completedItemsTotalValue: 0,
          lostOrderItemsTotalValue: 0,
        };
      });
      itemdatas.map((itemdata) => {
        necessaryTeamMemberDatas.map((necessaryTeamMemberData) => {
          if (necessaryTeamMemberData.id === itemdata.venderUid) {
            if (itemdata.label === "商談中") {
              necessaryTeamMemberData.inprogressItemsTotalValue += Number(
                itemdata.value
              );
            }
            if (itemdata.label === "失注") {
              necessaryTeamMemberData.lostOrderItemsTotalValue += Number(
                itemdata.value
              );
            }
            if (itemdata.label === "獲得") {
              necessaryTeamMemberData.completedItemsTotalValue += Number(
                itemdata.value
              );
            }
          }
        });
      });
      const i_data = necessaryTeamMemberDatas.map((necessaryTeamMemberData) => {
        return necessaryTeamMemberData.inprogressItemsTotalValue;
      });
      setInprogressData(i_data);

      const c_data = necessaryTeamMemberDatas.map((necessaryTeamMemberData) => {
        return necessaryTeamMemberData.completedItemsTotalValue;
      });
      setCompletedData(c_data);

      const l_data = necessaryTeamMemberDatas.map((necessaryTeamMemberData) => {
        return necessaryTeamMemberData.lostOrderItemsTotalValue;
      });
      setLostOrderData(l_data);

      const m_names = necessaryTeamMemberDatas.map(
        (necessaryTeamMemberData) => {
          return necessaryTeamMemberData.name;
        }
      );
      setMemberNames(m_names);
    };

    fetch();
  }, [teamId, itemdatas, fetch]);

  return (
    <Box display="flex" justifyContent="center">
      {completedData.length &&
        inprogressData.length &&
        lostOrderData.length &&
        memberNames.length && (
          <BarChart
            width={600}
            height={400}
            series={[
              {
                data: completedData,
                label: "獲得",
                id: "pvId",
                stack: "total",
              },
              {
                data: inprogressData,
                label: "商談中",
                id: "uvId",
                stack: "total",
              },
              {
                data: lostOrderData,
                label: "失注",
                id: "avId",
                stack: "total",
              },
            ]}
            xAxis={[{ data: memberNames, scaleType: "band" }]}
          />
        )}
    </Box>
  );
}

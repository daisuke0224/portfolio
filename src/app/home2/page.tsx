//@ts-nocheck
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
import { TaskCards } from "../components/task/TaskCards";
import { TaskCards2 } from "../components/task/TaskCards2";

import { Header } from "../components/header/Header";
import AcquisitionBarChart from "../components/AcquisitionBarChart";
import { userFirebaseAuthContext } from "@/firebase/auth";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/client";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function passwordreissue() {
  const [pieChartDatas, setPieChartDatas] = React.useState([]);
  const [barChartDatas, setBarChartDatas] = React.useState([]);
  const [userData, setUserData] = React.useState([]);

  const auth = userFirebaseAuthContext();
  const user = auth.currentUser;

  const fetchUser = async () => {
    if (!user) {
      return;
    }
    //ログインしている本人の情報を取得
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    setUserData(userData);

    // //チームの情報を取得
    // const usersQuery = query(collection(db, "users"));
    // const usersSnapshot = await getDocs(usersQuery);
    // const usersData = usersSnapshot.docs.map((doc) => doc.data());
    // setUsers(usersData);

    const customersQuery = query(
      collection(db, "customers"),
      where("venderTeamId", "==", userData.teamId)
    );

    const customersDocs = await getDocs(customersQuery);
    const customersData = customersDocs.docs.map((doc) => doc.data());
    console.log(customersData);
    const pieChartData = customersData.map((customer) => {
      return {
        label: customer.negotiationflag,
        value: customer.income,
      };
    });
    setPieChartDatas(pieChartData);

    const barChartData = customersData.map((customer) => {
      return {
        venderUid: customer.venderUid,
        label: customer.negotiationflag,
        value: customer.income,
      };
    });
    console.log(barChartData);
    setBarChartDatas(barChartData);
  };

  React.useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <>
      <div className={styles.body}>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Box sx={{ display: "block" }}>
          <Grid>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid xs={12} md={8}>
                <Item>
                  <FullWidthGrid></FullWidthGrid>
                </Item>
              </Grid>

              <header className={styles.header}>
                <h1 className={styles.h1}>獲得済みと予定</h1>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                      <Item sx={{ padding: 2 }}>
                        <TwoSimplePieChart
                          itemdatas={pieChartDatas}
                        ></TwoSimplePieChart>
                      </Item>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Item sx={{ padding: 2 }}>
                        <h1>金額</h1>
                        <AcquisitionBarChart
                          itemdatas={barChartDatas}
                          teamId={userData.teamId}
                        ></AcquisitionBarChart>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </header>

              <header className={styles.header}>
                <h1 className={styles.h1}>現在交渉中の案件</h1>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                      <Item sx={{ padding: 2 }}>
                        <h1>案件数</h1>
                        <NumberOfProjecfts></NumberOfProjecfts>
                      </Item>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Item sx={{ padding: 2 }}>
                        <h1>案件金額</h1>
                        <StackedBarChart
                          itemdatas={barChartDatas}
                          teamId={userData.teamId}
                        ></StackedBarChart>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </header>

              {/* <h2>チャット</h2>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2}>
                <Grid md={12}>
                  <Item sx={{ padding: 2 }}></Item>
                </Grid>
              </Grid>
            </Box> */}

              <header className={styles.header}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Grid container spacing={2.5}>
                    <Grid md={12}>
                      <div className={styles.app}>
                        <Header></Header>
                        <TaskCards></TaskCards>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </header>
            </Box>
          </Grid>
        </Box>

        <BottomAppBar></BottomAppBar>
      </div>
    </>
  );
}

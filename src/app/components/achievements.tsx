//@ts-nocheck
"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { userFirebaseAuthContext } from "@/firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/client";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
  const [users, setUsers] = React.useState([]);
  const [goalAmount, setGoalAmount] = React.useState(0);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [difference, setDifference] = React.useState(0); // 追加

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

    //チームの情報を取得
    const usersQuery = query(collection(db, "users"));
    const usersSnapshot = await getDocs(usersQuery);
    const usersData = usersSnapshot.docs.map((doc) => doc.data());
    setUsers(usersData);

    //チームのドキュメントを作成または更新する
    const teamRef = doc(db, "teams", userData.teamId);
    const teamDoc = await getDoc(teamRef);
    const teamData = teamDoc.exists() ? teamDoc.data() : {};

    // goalAmountの値を設定
    console.log(teamData.goalAmount);
    setGoalAmount(teamData.goalAmount || 0);
    console.log(goalAmount);
    // customersコレクションからvenderUidがteamDataのmemberIdsのいずれかと一致するドキュメントを取得
    console.log(userData.teamId);
    const customersQuery = query(
      collection(db, "customers"),
      where("venderTeamId", "==", userData.teamId),
      where("negotiationflag", "==", "獲得") //negotiationが獲得と一致する条件をついか
    );

    const customersDocs = await getDocs(customersQuery);
    const customersData = customersDocs.docs.map((doc) => doc.data());
    console.log(customersData);

    // incomeの合計値を計算
    const totalIncome = customersData.reduce(
      (sum, customer) => sum + Number(customer.income || 0),
      0
    );

    console.log(teamData); // customersDataの値を確認
    console.log(customersData); // customersDataの値を確認
    console.log(totalIncome); // totalIncomeの値を確認

    setTotalIncome(totalIncome);

    console.log(goalAmount, totalIncome);
    const difference = goalAmount - totalIncome;
    setDifference(difference); // 追加
  };

  React.useEffect(() => {
    console.log("effect");
    fetchUser();
  }, [auth, goalAmount]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={6} md={4}>
          <h1>収入目標</h1>
          <Item
            sx={{
              fontSize: "3rem",
              border: "10px solid #ccc",
            }}
          >
            {goalAmount.toLocaleString()}
          </Item>
        </Grid>
        <Grid xs={6} md={4}>
          <h1>現在</h1>
          <Item
            sx={{
              fontSize: "3rem",
              border: "10px solid #ccc",
            }}
          >
            {totalIncome.toLocaleString()}
          </Item>
        </Grid>
        <Grid xs={6} md={4}>
          <h1>残り</h1>
          <Item
            sx={{
              fontSize: "3rem",
              border: "10px solid #ccc",
            }}
          >
            {difference <= 0 ? "達成" : difference.toLocaleString()}
          </Item>
        </Grid>
        {/* <button onClick={fetchUser}>fetchUser</button> */}
      </Grid>
    </Box>
  );
}

//@ts-nocheck
"use client";
import * as React from "react";
import styles from "./page.module.css";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  where,
  query,
  getDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/firebase/client";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { userFirebaseAuthContext } from "@/firebase/auth";

export default function passwordreissue() {
  const [users, setUsers] = React.useState([]);

  const auth = userFirebaseAuthContext();
  const user = auth.currentUser;

  React.useEffect(() => {
    if (!user) return;
    const fetchUsers = async () => {
      //ログインしている本人の情報を取得
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      console.log(userData);

      //チームの情報を取得
      const usersQuery = query(
        collection(db, "users"),
        where("teamId", "==", userData.teamId)
      );
      const usersSnapshot = await getDocs(usersQuery);
      const usersData = usersSnapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    };
    fetchUsers();
  }, [auth]);

  const deleteUser = async (userId) => {
    try {
      //Firestoreのドキュメントを削除
      await deleteDoc(doc(db, "users", userId));

      //Authenticationのユーザーを削除
      await auth.currentUser.delete();

      // Storageのファイルを削除
      const storage = getStorage();

      const desertRef = ref(storage, `users/${photoURL}`);
      deleteObject(desertRef).then(() => {
        //成功した場合
        console.log("削除に成功しました");
      });
    } catch (error) {
      //失敗した場合
      console.error("削除にエラーが発生しました", error);
    }
  };

  return (
    <div className={styles.body}>
      <React.Fragment>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              height: "60%",
            }}
          >
            <Box
              bgcolor={"#eeeeee"}
              width={"sm"}
              p={4}
              borderRadius={"md"}
              sx={{
                boxShadow: 8,
                borderRadius: "16px",
              }}
            >
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                管理者メニュー
              </Typography>
              <Typography variant="h3" textAlign="center" mt={2} sx={{ mb: 3 }}>
                ユーザー削除
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {users.map((user) => (
                  <ListItem key={user.id}>
                    <ListItemAvatar>
                      <Avatar alt={user.name} src={user.photoURL} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => deleteUser(user.id)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </Container>
      </React.Fragment>
    </div>
  );
}

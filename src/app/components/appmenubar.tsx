"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "next/link";

const pages = [
  "ホーム",
  "案件新規入力",
  "案件一覧",
  "案件編集",
  "管理者メニュー",
  "管理者メニューユーザー追加",
  "管理者メニューユーザー削除",
  "管理者メニュー営業目標数値",
  "アカウント登録",
  "パスワードの再発行",
  "パスワードの再設定",
  "マイページ",
  "お問合せ",
  "ログイン",
  "ログアウト",
];

const links = [
  "home", //ホーム
  "iteminput", //案件入力画面
  "projectmanagement", //案件一覧
  "itemedit", //案件編集画面
  "adminmenu", //管理者メニュー
  "addadminmenuuser", //管理者メニューユーザー追加
  "adminmenuuserdelete", //管理者メニューユーザー削除
  "addminmenutargetvalue", //管理者メニュー営業目標数値
  "register", //アカウント登録
  "passwordreissue", //パスワードの再発行
  "resettingapassword", //パスワードの再設定
  "mypage", //マイページ
  "contactform", //お問合せ
  "login", //ログイン
];

const manubarLinks = [
  { text: "ホーム", to: "/home" },
  { text: "案件入力画面", to: "/iteminput" },
  { text: "案件一覧", to: "/projectmanagement" },
  { text: "案件編集画面", to: "/itemedit" },
  { text: "管理者メニュー", to: "/adminmenu" },
  { text: "管理者メニューユーザー追加", to: "/addadminmenuuser" },
  { text: "管理者メニューユーザー削除", to: "/adminmenuuserdelete" },
  { text: "管理者メニュー営業目標数値", to: "/addminmenutargetvalue" },
  { text: "アカウント登録", to: "/register" },
  { text: "パスワードの再発行", to: "/passwordreissue" },
  { text: "パスワードの再設定", to: "/resettingapassword" },
  { text: "マイページ", to: "/mypage" },
  { text: "ログイン", to: "/login" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {manubarLinks.map((page) => (
            <Link href={page.to} key={page.text}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.text}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;

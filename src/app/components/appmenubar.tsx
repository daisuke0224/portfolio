"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "next/link";
import { homedir } from "os";

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
          {pages.map((page, root) => (
            // <Link href={`/${root === "ホーム" ? "" : root}`} key={root}>
            //リンクを作成。よう確認
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
            // </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;

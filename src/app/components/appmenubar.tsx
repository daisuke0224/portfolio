"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "next/link";
import { auth } from "@/firebase/client";

const manubarLinks = [
  { text: "ホーム", to: "/home2" },
  { text: "案件入力画面", to: "/iteminput" },
  { text: "案件一覧", to: "/projectmanagement" },
  { text: "お問合せ", to: "/contactform" },
];

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {manubarLinks.map((page) => (
            <Link href={page.to} key={page.text}>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "16px",
                }}
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

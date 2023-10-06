//@ts-nocheck
"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { logout } from "./logoutbutton";
import { auth, db } from "@/firebase/client";
import { mypage } from "../mypage2/page";
import { userFirebaseAuthContext } from "@/firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function PrimarySearchAppBar() {
  //ログアウト実装するために追加
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isTeamAdmin, setIsTeamAdmin] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //ログアウト実装するために追加
  const handleLogout = async () => {
    await logout();
    setOpen(true);
    setAnchorEl(null);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  const auth = userFirebaseAuthContext();

  const fetchUser = async () => {
    //ログインしている本人の情報を取得
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    const userRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userRef);
    const userData = userDocSnapshot.data();
    const isTeamAdmin = userData.isTeamAdmin;
    console.log(isTeamAdmin);
    if (userData.isTeamAdmin === true) {
      setIsTeamAdmin(true);
    }
  };
  fetchUser();

  const handleMypage = () => {
    router.push(
      auth.currentUser?.uid
        ? `/mypage2?id=${auth.currentUser?.uid}`
        : "/mypage2"
    );
  };

  const handleAdomin = () => {
    router.push("/adminmenu");
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMypage}>マイページ</MenuItem>
      {isTeamAdmin && (
        <MenuItem onClick={handleAdomin}>管理者メニュー</MenuItem>
      )}
      <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            fontFamily={"sans-serif"}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            営業管理効率化コミュニケーションサイト
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          ログアウトしました
        </Alert>
      </Snackbar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar } from "@mui/material";

export default function BottomAppBar() {
  return (
    <Box sx={{ flexGrow: 10 }}>
      <AppBar
        position="static"
        color="primary"
        sx={{ alignItems: "center", top: "auto", bottom: 0 }}
      >
        <Toolbar>
          <footer>
            <p>営業管理効率化コミュニケーションサイト</p>
          </footer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

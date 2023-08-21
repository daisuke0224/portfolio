import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      fullWidth
      sx={{ marginBottom: 3 }}
      renderInput={(params) => <TextField {...params} label="交渉フラグ" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [{ label: "商談中" }, { label: "獲得" }, { label: "失注" }];

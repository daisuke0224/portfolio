"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox() {
  const [top100Films, setTop100Films] = React.useState("");

  React.useEffect(() => {
    setTop100Films("");
  });

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      fullWidth
      sx={{ marginBottom: 3 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="交渉フラグ"
          name="top100Films"
          value={top100Films}
          onChange={(e) => setTop100Films(e.target.value)}
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [{ label: "商談中" }, { label: "獲得" }, { label: "失注" }];

// export default function passwordreissue() {
//   const [negotiation, setNegotiation] = useState("");

//   useEffect(() => {
//     setNegotiation("");
//     }, []);

//   const onClickAdd = async () => {
//     console.log(negotiation);
//     const collectionRef = collection(db, "customers");
//     const docRef = doc(collectionRef);
//     await setDoc(docRef, {
//       negotiationflag: negotiation,
//     });
//   };
// <TextField
//                 id="コメント"
//                 label="コメント"
//                 fullWidth
//                 multiline
//                 rows={10}
//                 sx={{ mb: 3 }}
//                 name="comment"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />

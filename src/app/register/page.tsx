import Button from "@mui/material/Button";
import styles from "./page.module.css";
import { Box, Fab, Input, Paper, TextField } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const register = () => {
  return (
    <div className={styles.body}>
      <div className={styles.formContainer}>
        <form>
          <h1>アカウント登録フォーム</h1>
          <hr />
          <div className={styles.uiForm}>
            <TextField
              id="メールアドレス"
              label="メールアドレス"
              variant="outlined"
              fullWidth
              color="secondary"
            />
            <TextField
              id="名前"
              label="名前"
              variant="outlined"
              fullWidth
              color="secondary"
            />
            <TextField
              id="パスワード"
              label="パスワード"
              variant="outlined"
              fullWidth
              color="secondary"
            />
            <TextField
              id="パスワード確認"
              label="パスワード確認"
              variant="outlined"
              fullWidth
              color="secondary"
            />
            <Fab variant="extended">
              <CameraAltIcon sx={{ mr: 1 }} />
              プロフィール画像ファイル選択
            </Fab>
            <Button variant="contained" fullWidth>
              送信
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default register;

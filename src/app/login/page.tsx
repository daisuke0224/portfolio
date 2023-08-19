import Button from "@mui/material/Button";
import styles from "./page.module.css";

export const Login = () => {
  return (
    <div className={styles.body}>
      <div className={styles.formContainer}>
        <form>
          <h1>ログインフォーム</h1>
          <hr />
          <div className={styles.uiForm}>
            <div className={styles.formField}>
              <label>メールアドレス</label>
              <input
                type="text"
                placeholder="メールアドレス"
                name="mailAddress"
              />
            </div>
            <div className={styles.formField}>
              <label>パスワード</label>
              <input type="text" placeholder="パスワード" name="password" />
            </div>
            <a href="/">パスワードを忘れた方はこちら</a>
            <Button variant="contained" className={styles.login}>
              ログイン
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

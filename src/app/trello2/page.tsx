import React from "react";
import styles from "./page.module.css";
import { TaskCards } from "../components/task/TaskCards";

const App = () => {
  return (
    <div className={styles.app}>
      <TaskCards />
    </div>
  );
};

export default App;

import React from "react";
import styles from "./page.module.css";
import { TaskCards } from "../components/task/TaskCards";
import { Header } from "../components/header/Header";

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <TaskCards />
    </div>
  );
};

export default App;

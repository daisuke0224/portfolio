import React from "react";
import styles from "../task/styles.module.css";

export const Header = () => {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Trello風タスク管理</h1>
      </header>
    </div>
  );
};

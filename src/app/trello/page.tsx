"use client";
import * as React from "react";
import styles from "./page.module.css";
import Main from "./Main";

const trello = () => {
  return (
    <div className={styles.body}>
      <div style={{ padding: "50px" }}>
        <h1 style={{ marginBottom: "20px" }}>Trello風アプリ</h1>
        <Main />
      </div>
    </div>
  );
};

export default trello;

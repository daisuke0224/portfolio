//@ts-nocheck
"use client";
import React from "react";
import styles from "../styles.module.css";
import ClearIcon from "@mui/icons-material/Clear";

export const TaskCardDeleteButton = ({
  taskCardList,
  setTaskCardList,
  taskCard,
}) => {
  const taskCardDeleteButton = (id) => {
    //タスクカードを削除する
    setTaskCardList(taskCardList.filter((e) => e.id !== id));
  };
  return (
    <div>
      <button
        className={styles.taskCardDeleteButton}
        onClick={() => taskCardDeleteButton(taskCard.id)}
      >
        <ClearIcon />
      </button>
    </div>
  );
};

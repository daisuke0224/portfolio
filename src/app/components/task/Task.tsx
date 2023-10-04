//@ts-nocheck
"use client";
import styles from "./styles.module.css";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const Task = ({ task, taskList, setTaskList }) => {
  const handleDelete = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };
  return (
    <div className={styles.taskBox}>
      <p className={styles.taskText}>{task.text}</p>
      <button
        className={styles.taskTrashButton}
        onClick={() => handleDelete(task.id)}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

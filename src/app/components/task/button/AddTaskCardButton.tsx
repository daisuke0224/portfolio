//@ts-nocheck
"use client";
import React from "react";
import styles from "../styles.module.css";
import { v4 as uuid } from "uuid";

export const AddTaskCardButton = ({ taskCardList, setTaskCardList }) => {
  const addTaskCard = () => {
    const taskCardId = uuid();
    //タスクカードを追加する//
    setTaskCardList([
      ...taskCardList,
      { id: taskCardId, draggableId: `item1${taskCardId}` },
    ]);
  };
  return (
    <div className={styles.addTaskCardButtonArea}>
      <button className={styles.addTaskCardButton} onClick={addTaskCard}>
        +
      </button>
    </div>
  );
};

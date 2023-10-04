//@ts-nocheck
"use client";
import React from "react";
import styles from "./styles.module.css";
import { TaskCardDeleteButton } from "./button/TaskCardDeleteButton";
import { TaskAddInput } from "./input/TaskAddInput";
import { Tasks } from "./Tasks";
import { TaskCardTitle } from "./TaskCardTitle";

export const TaskCard = () => {
  const [inputText, setInputText] = React.useState("");
  const [taskList, setTaskList] = React.useState([]);
  return (
    <div className={styles.taskCard}>
      <TaskCardTitle />
      <TaskCardDeleteButton />
      <TaskAddInput
        inputText={inputText}
        setInputText={setInputText}
        setTaskList={setTaskList}
        taskList={taskList}
      />
      <Tasks
        inputText={inputText}
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </div>
  );
};

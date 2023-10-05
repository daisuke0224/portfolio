//@ts-nocheck
"use client";
import styles from "./styles.module.css";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";

export const Task = ({ task, taskList, setTaskList, index }) => {
  const handleDelete = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };
  return (
    <Draggable index={index} draggableId={task.draggableId}>
      {(provided) => (
        <div
          className={styles.taskBox}
          key={task.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className={styles.taskText}>{task.text}</p>
          <button
            className={styles.taskTrashButton}
            onClick={() => handleDelete(task.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      )}
    </Draggable>
  );
};

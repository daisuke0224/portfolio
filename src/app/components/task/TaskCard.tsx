//@ts-nocheck
"use client";
import React from "react";
import styles from "./styles.module.css";
import { TaskCardDeleteButton } from "./button/TaskCardDeleteButton";
import { TaskAddInput } from "./input/TaskAddInput";
import { Tasks } from "./Tasks";
import { TaskCardTitle } from "./TaskCardTitle";
import { Draggable } from "react-beautiful-dnd";

export const TaskCard = ({
  taskCardList,
  setTaskCardList,
  taskCard,
  index,
}) => {
  const [inputText, setInputText] = React.useState("");
  const [taskList, setTaskList] = React.useState([]);
  return (
    <Draggable draggableId={taskCard.id} index={index}>
      {(providid) => (
        <div
          className={styles.taskCard}
          ref={providid.innerRef}
          {...providid.draggableProps}
        >
          <div
            className={styles.taskCardTitleAndTaskCardDeleteButtonArea}
            {...providid.dragHandleProps}
          >
            <TaskCardTitle />
            <TaskCardDeleteButton
              taskCardList={taskCardList}
              setTaskCardList={setTaskCardList}
              taskCard={taskCard}
            />
          </div>
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
      )}
    </Draggable>
  );
};

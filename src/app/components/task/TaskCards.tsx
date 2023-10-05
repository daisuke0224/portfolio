//@ts-nocheck
"use client";
import React from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskCardButton } from "./button/AddTaskCardButton";
import styles from "./styles.module.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorder = (taskCardList, startIndex, endIndex) => {
  //タスクを並び替える
  const remove = taskCardList.splice(startIndex, 1); //[2,3]
  taskCardList.splice(endIndex, 0, remove[0]); //[2,1,3]
};

export const TaskCards = () => {
  const [taskCardList, setTaskCardList] = React.useState([
    {
      id: "0",
      draggableId: "item0",
    },
  ]);

  const handleDragEnd = (result) => {
    reorder(taskCardList, result.source.index, result.destination.index);
    setTaskCardList(taskCardList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            className={styles.taskCardsArea}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {taskCardList.map((taskCard, index) => (
              <TaskCard
                key={taskCard.id}
                index={index}
                taskCardList={taskCardList}
                setTaskCardList={setTaskCardList}
                taskCard={taskCard}
              />
            ))}
            {provided.placeholder}
            <AddTaskCardButton
              taskCardList={taskCardList}
              setTaskCardList={setTaskCardList}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

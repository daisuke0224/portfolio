//@ts-nocheck
"use client";
import React from "react";
import styles from "./page.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dummyData from "./dummyData";
import Card from "./Card";

const Main = () => {
  const [data, setData] = React.useState(dummyData);

  return (
    <DragDropContext>
      <div className={styles.trello}>
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className={styles.trellosection}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className={styles.trellosectiontitle}>{section.title}</div>
                <div>
                  {section.tasks.map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Main;

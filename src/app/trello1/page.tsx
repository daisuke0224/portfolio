//@ts-nocheck
"use client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React from "react";
import styles from "./page.module.css";

const App = () => {
  const [items, setItems] = React.useState([
    { id: 0, text: "item0" },
    { id: 1, text: "item1" },
    { id: 2, text: "item2" },
  ]);
  const onDragEnd = (result) => {
    const remove = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, remove[0]);
  };

  return (
    <div className={styles.dragDropArea}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable draggableId={item.text} index={index} key={item.id}>
                  {(provided) => (
                    <div
                      className={styles.item}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;

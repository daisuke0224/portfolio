//@ts-nocheck
"use client";
import React from "react";
import styles from "./page.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dummyData from "./dummyData";
import Card from "./Card";

const Main = () => {
  const [data, setData] = React.useState(dummyData);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    //別のカラムにタスクが移動したとき
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      //動かし始めたタスクを削除
      const [removed] = sourceTask.splice(source.index, 1);
      // 動かした後のカラムにタスクを追加
      destinationTask.splice(destination.index, 0, removed);

      const newData = [...data]; // dataのコピーを作成
      newData[sourceColIndex].tasks = sourceTask;
      newData[destinationColIndex].tasks = destinationTask;

      setData([...newData]); // newDataをセットする
    } else {
      //同じカラム内でのタスクの入れ替え
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const sourceCol = data[sourceColIndex];

      const sourceTask = [...sourceCol.tasks];
      //タスクを削除
      const [removed] = sourceTask.splice(source.index, 1);
      //タスクを追加
      sourceTask.splice(destination.index, 0, removed);
      const newData = [...data]; // dataのコピーを作成
      newData[sourceColIndex].tasks = sourceTask;

      setData([...newData]); // newDataをセットする
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <div {...provided.dragHandleProps}></div>{" "}
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

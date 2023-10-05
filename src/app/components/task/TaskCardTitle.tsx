//@ts-nocheck

import React from "react";
import styles from "./styles.module.css";

export const TaskCardTitle = () => {
  const [isClick, setIsClick] = React.useState(false);
  const [inputCardTitle, setInputCardTitle] = React.useState("Today");

  const handleClick = () => {
    setIsClick(true);
  };
  const handleChange = (e) => {
    setInputCardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClick(false);
  };

  const handleBlur = () => {
    setIsClick(false);
  };

  return (
    <div onClick={handleClick} className={styles.taskCardTitleInputArea}>
      {isClick ? (
        <form onSubmit={handleSubmit}>
          <input
            className={styles.taskCardTitleInput}
            autoFocus
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={inputCardTitle}
            maxLength="10"
          />
        </form>
      ) : (
        <h3>{inputCardTitle}</h3>
      )}
    </div>
  );
};

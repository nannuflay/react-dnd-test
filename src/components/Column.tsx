import React from "react";
import { useDrop } from "react-dnd";
import { COLUMN_NAMES } from "./../constants";

const Column = ({ children, className, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor.canDrop() function
    canDrop: (item: any) => {
      const { RIGHT_DROPZONE, LEFT_DROPZONE } = COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === LEFT_DROPZONE && title === RIGHT_DROPZONE)
      );
    },
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return "rgb(188,251,255)";
      } else if (!canDrop) {
        return "rgb(255,188,188)";
      }
    } else {
      return "";
    }
  };

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>{title}</p>
      {children}
    </div>
  );
};

export default Column;

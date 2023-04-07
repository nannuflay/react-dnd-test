import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { COLUMN_NAMES } from "./constants";
import { tasks } from "./tasks";
import Column from "./components/Column";
import MovableItem from "./components/MovableItem";

export const App = () => {
  const [items, setItems] = useState(tasks);
  const isMobile = window.innerWidth < 600;

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName: string) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { RIGHT_DROPZONE, LEFT_DROPZONE } = COLUMN_NAMES;

  return (
    <div className="container flex justify-center">
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Column title={LEFT_DROPZONE} className="column left -dropzone ">
          {returnItemsForColumn(LEFT_DROPZONE)}
        </Column>
        <Column title={RIGHT_DROPZONE} className="column right-dropzone">
          {returnItemsForColumn(RIGHT_DROPZONE)}
        </Column>
      </DndProvider>
    </div>
  );
};

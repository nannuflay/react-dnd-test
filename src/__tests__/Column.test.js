import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Column from "../components/Column";

describe("Column", () => {
  test("renders with title and children", () => {
    const title = "Column Title";
    const childText = "Child Text";
    const container = document.createElement("div");
    act(() => {
      ReactDOM.render(
        <Column title={title}>
          <p>{childText}</p>
        </Column>,
        container
      );
    });
    const column = container.querySelector(".column");
    expect(column.textContent).toContain(title);
    expect(column.textContent).toContain(childText);
  });
});

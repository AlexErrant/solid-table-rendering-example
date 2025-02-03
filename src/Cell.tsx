import { Component } from "solid-js";

export interface CellProps {
  text: string;
}

export const Cell: Component<CellProps> = (props) => {
  console.log("Cell Component Function")
  return (
    <>
      <span>{props.text}</span>
    </>
  );
};

import { Key } from "@solid-primitives/keyed";
import { Row, flexRender } from "@tanstack/solid-table";
import { Component, For } from "solid-js";
import { Cell } from "./Cell";

export interface RowProps {
  row: Row<any>;
}

export const TableRow: Component<RowProps> = (props: RowProps) => {
  console.log("TableRow Function")
  return (
    <>
      <tr>
        <Key each={props.row.getVisibleCells()} by={c => c.id}>
          {(cell) => (
            <td><Cell text={cell().getValue() as string} /></td>
          )}
        </Key>
      </tr>
    </>
  );
};

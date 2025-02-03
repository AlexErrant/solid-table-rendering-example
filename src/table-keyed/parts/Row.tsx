import { Key } from "@solid-primitives/keyed";
import { Row, flexRender } from "@tanstack/solid-table";
import { Component, For } from "solid-js";

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
            <td>{flexRender(cell().column.columnDef.cell, cell().getContext())}</td>
          )}
        </Key>
      </tr>
    </>
  );
};

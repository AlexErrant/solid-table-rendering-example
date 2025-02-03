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
        <For each={props.row.getVisibleCells()} >
          {(cell) => (
            <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
          )}
        </For>
      </tr>
    </>
  );
};

import { Key } from "@solid-primitives/keyed";
import { Row } from "@tanstack/solid-table";
import { Component, Index } from "solid-js";
import { Dynamic } from "solid-js/web";

export interface RowProps {
  row: Row<any>;
}

export const TableRow: Component<RowProps> = (props: RowProps) => {
  console.log("TableRow Function")
  return (
    <>
      <tr>
        <Index each={props.row.getVisibleCells()}>
          {(cell) => (
            <td>
              <Dynamic
                component={cell().column.columnDef.cell}
                {...cell().getContext()}
              />
            </td>
          )}
        </Index>
      </tr>
    </>
  );
};

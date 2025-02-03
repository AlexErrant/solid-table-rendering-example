import {
  ColumnDef,
  createSolidTable,
  getCoreRowModel,
} from "@tanstack/solid-table";
import { Component, For } from "solid-js";
import { TableRow } from "./parts/Row";
import { Key } from "@solid-primitives/keyed";

export interface TableProps {
  columnDefs: ColumnDef<any>[];
  data: any;
}

export const TableNaive: Component<TableProps> = (props) => {
  const table = createSolidTable({
    get data() {
      return props.data;
    },
    get columns() {
      return props.columnDefs;
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          <For each={table.getRowModel().rows} >
            {(row) => <TableRow row={row} />}
          </For >
        </tbody>
      </table>
    </>
  );
};

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

export const TableKeyed: Component<TableProps> = (props) => {
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
          <Key each={table.getRowModel().rows} by={r => r.original.id}>
            {(row) => <TableRow row={row()} />}
          </Key>
        </tbody>
      </table>
    </>
  );
};

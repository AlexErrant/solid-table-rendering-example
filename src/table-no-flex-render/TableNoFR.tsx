import {
  ColumnDef,
  ColumnOrderState,
  RowSelectionState,
  createSolidTable,
  getCoreRowModel,
} from "@tanstack/solid-table";
import { Component, Index, createSignal } from "solid-js";
import { TableRow } from "./parts/Row";
import { Key } from "@solid-primitives/keyed";
import { Person } from "../App";

export interface TableProps {
  columnDefs: ColumnDef<any>[];
  data: any;
}

const people: Person[] = [
  { id: "1", name: "John", surname: "Adams" },
  { id: "2", name: "George", surname: "Jones" },
  { id: "3", name: "Herp", surname: "Derp" },
];

export const TableNoFR: Component<TableProps> = (props) => {
  const [dataNoFR, setDataNoFR] = createSignal(people);
  const [rowSelection, setRowSelection] = createSignal<RowSelectionState>({});
  const [columnOrder, setColumnOrder] = createSignal<ColumnOrderState>([
    "name",
    "surname",
  ]);
  const table = createSolidTable({
    get data() {
      return dataNoFR();
    },
    get columns() {
      return props.columnDefs;
    },
    getCoreRowModel: getCoreRowModel(),
    state: {
      get columnOrder() {
        return columnOrder();
      },
      get rowSelection() {
        return rowSelection();
      },
    },
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
  });

  return (
    <>
      <button
        onclick={() => {
          setColumnOrder(([h, t, ...r]) => [t, h, ...r]);
        }}
      >
        Reorder Columns
      </button>
      <button
        onclick={() => {
          setDataNoFR(([h, t, ...r]) => [t, h, ...r]);
        }}
      >
        Reorder Rows
      </button>
      <button
        onclick={() => {
          setDataNoFR((old) => {
            let randomI = randomIndex(old);
            return old.map((p, i) =>
              i === randomI ? { ...p, name: getRandomFood() } : p,
            );
          });
        }}
      >
        Update Value
      </button>
      <button
        onclick={() => {
          setDataNoFR((old) => {
            let newArr = [...old];
            let randomI = randomIndex(old);
            newArr.splice(randomI, 0, {
              id: (old.length + 1).toString(),
              name: getRandomFood(),
              surname: getRandomFood(),
            });
            return newArr;
          });
        }}
      >
        Add
      </button>
      <button
        onclick={() => {
          setDataNoFR((old) => {
            let newArr = [...old];
            let randomI = randomIndex(old);
            newArr.splice(randomI, 1);
            return newArr;
          });
        }}
      >
        Delete
      </button>
      <table>
        <thead></thead>
        <tbody>
          <Key each={table.getRowModel().rows} by={(r) => r.original.id}>
            {(row) => <TableRow row={row()} />}
          </Key>
        </tbody>
      </table>
    </>
  );
};

const foods = [
  "oatmeal",
  "plantains",
  "cranberries",
  "chickpeas",
  "tofu",
  "Parmesan cheese",
  "amaretto",
  "sunflower seeds",
  "grapes",
  "vegemite",
  "pasta",
  "cider",
  "chicken",
  "pinto beans",
  "bok choy",
  "sweet peppers",
  "Cappuccino Latte",
  "corn",
  "broccoli",
  "brussels sprouts",
  "bread",
  "milk",
  "honey",
  "chips",
  "cookie",
];
const randomIndex = (list: readonly any[]): number =>
  Math.floor(Math.random() * list.length);
const getRandomFood = () => foods[randomIndex(foods)];

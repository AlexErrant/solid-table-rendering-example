import { type Component } from "solid-js";
import styles from "./App.module.css";
import { ColumnDef } from "@tanstack/solid-table";
import {
  ColumnOrderState,
  RowSelectionState,
  createSolidTable,
  getCoreRowModel,
} from "@tanstack/solid-table";
import { Index, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Key } from "@solid-primitives/keyed";

const initialData: Food[] = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Cilantro" },
];

interface Food {
  id: string;
  name: string;
}

const colDefs: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    cell: (info) => (
      <>
        <input
          type="checkbox"
          class="checkbox"
          checked={info.row.getIsSelected()}
          disabled={!info.row.getCanSelect()}
          onChange={info.row.getToggleSelectedHandler()}
        />
        {info.getValue()}
      </>
    ),
  },
  {
    accessorKey: "name",
    cell: (info) => <>{info.getValue()}</>, // putting it in a fragment is important - this makes it reactive
  },
  {
    id: "nameLength",
    header: () => "name length", // make it a signal
    cell: (info) => <>{info.row.original.name.length}</>,
  },
];

const App: Component = () => {
  const [data, setData] = createSignal(initialData);
  const [rowSelection, setRowSelection] = createSignal<RowSelectionState>({});
  const [columnOrder, setColumnOrder] = createSignal<ColumnOrderState>([
    "id",
    "name",
    "nameLength",
  ]);
  const table = createSolidTable({
    get data() {
      return data();
    },
    get columns() {
      return colDefs;
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
    getRowId: (row) => row.id, // This is important since the row order may change
  });

  return (
    <div class={styles.App}>
      <button
        onclick={() => {
          setData((old) => {
            let newArr = [...old];
            let randomI = randomIndex(old);
            let id = Math.max(...old.map((o) => Number.parseInt(o.id))) + 1;
            newArr.splice(randomI, 0, {
              id: id.toString(),
              name: getRandomFood(),
            });
            return newArr;
          });
        }}
      >
        Add at Random Index
      </button>
      <button
        onclick={() => {
          setData((old) => {
            let newArr = [...old];
            let randomI = randomIndex(old);
            newArr.splice(randomI, 1);
            return newArr;
          });
        }}
      >
        Delete Random
      </button>
      <button
        onclick={() => {
          setColumnOrder(([a, b, ...z]) => [b, a, ...z]);
        }}
      >
        Reorder Columns
      </button>
      <button
        onclick={() => {
          setData(([a, b, ...z]) => [b, a, ...z]);
        }}
      >
        Reorder Rows
      </button>
      <button
        onclick={() => {
          setData((old) => {
            let randomI = randomIndex(old);
            return old.map((p, i) =>
              i === randomI ? { ...p, name: getRandomFood() } : p,
            );
          });
        }}
      >
        Update Random Value
      </button>
      <table>
        <thead>
          <Index each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                {/* `Key` to support reordering columns */}
                <Key each={headerGroup().headers} by={(r) => r.id}>
                  {(header) => (
                    <th>
                      <Dynamic
                        component={header().column.columnDef.header}
                        {...header().getContext()}
                      />
                    </th>
                  )}
                </Key>
              </tr>
            )}
          </Index>
        </thead>
        <tbody>
          {/* Use `Key` if you will be reordering or inserting rows arbitrarily into the table - otherwise Index should work fine */}
          <Key each={table.getRowModel().rows} by={(r) => r.id}>
            {(row) => (
              <tr>
                <Index each={row().getVisibleCells()}>
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
            )}
          </Key>
        </tbody>
      </table>
    </div>
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

export default App;

import { createSignal, type Component } from "solid-js";

import styles from "./App.module.css";
import { TableNaive } from "./table-naive/TableNaive";
import { ColumnDef } from "@tanstack/solid-table";
import { Cell } from "./Cell";
import { TableKeyed } from "./table-keyed/TableKeyed";
import { TableNoFR } from "./table-no-flex-render/TableNoFR";

export interface Person {
  id: string;
  name: string;
  surname: string;
}

const people: Person[] = [
  { id: "1", name: "John", surname: "Adams" },
  { id: "2", name: "George", surname: "Jones" },
];

const App: Component = () => {
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
          <Cell text={info.getValue() as string} />
        </>
      ),
    },
    {
      accessorKey: "name",
      cell: (info) => <Cell text={info.getValue() as string} />,
    },
    {
      accessorKey: "surname",
      cell: (info) => <Cell text={info.getValue() as string} />,
    },
  ];

  const [dataNaive, setDataNaive] = createSignal(people);

  function updatePerson() {
    console.log("Update Person Naive")
    setDataNaive((prev) => {
      const newList = [...prev];
      newList[0].name = "Jeff" + Math.random();
      return newList;
    });
  }

  const [dataKeyed, setDataKeyed] = createSignal(people);

  function updatePersonKeyed() {
    console.log("Update Person Keyed")
    setDataKeyed((prev) => {
      const newList = [...prev];
      newList[0].name = "Jeff";
      return newList;
    });
  }

  const [dataNoFR, setDataNoFR] = createSignal(people);

  function updatePersonNoFR() {
    console.log("Update Person No flexRender");
    setDataNoFR((prev) => {
      const newList = [...prev];
      newList[0].name = "Jeff" + Math.random();
      return newList;
    });
  }


  return (
    <div class={styles.App}>
      <header class={styles.header}>
      <section>Tanstack Table as per docs</section>
      <section>
        <TableNaive columnDefs={colDefs} data={dataNaive()} />
      </section>
      <section>
        <button type="button" onClick={updatePerson}>
          Update Person
        </button>
      </section>

      </header>
      <header class={styles.header}>
      <section>Tanstack Table Keyed loops</section>
      <section>
        <TableKeyed columnDefs={colDefs} data={dataKeyed()} />
      </section>
      <section>
        <button type="button" onClick={updatePersonKeyed}>
          Update Person
        </button>
      </section>

      </header>
      <header class={styles.header}>
      <section>Tanstack Table Keyed loops, no flexRender</section>
      <section>
        <TableNoFR columnDefs={colDefs} data={dataNoFR()} />
      </section>
      <section>
        <button type="button" onClick={updatePersonNoFR}>
          Update Person
        </button>
      </section>

      </header>

    </div>
  );
};

export default App;

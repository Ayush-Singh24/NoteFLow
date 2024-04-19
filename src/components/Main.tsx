import { ListType } from "@/lib/constants";
import List from "./List";
import { useState } from "react";
import DropListIndicator from "./DropListIndicator";

export default function Main({
  lists,
  setLists,
}: {
  lists: ListType[];
  setLists: (data: ListType[]) => void;
}) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <main
      className={`p-5 flex gap-10 flex-wrap justify-center items-start flex-1`}
      onDragOver={handleDragOver}
    >
      {lists &&
        lists.map((list) => (
          <div
            key={list.id}
            className="w-full md:w-1/5 flex justify-between gap-2"
          >
            <DropListIndicator />
            <List lists={lists} list={list} setLists={setLists} />
            <DropListIndicator />
          </div>
        ))}
    </main>
  );
}

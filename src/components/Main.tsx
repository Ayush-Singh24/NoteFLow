"use client";

import { ListType, noteflow } from "@/lib/constants";
import List from "./List";
import { useEffect, useState } from "react";

export default function Main() {
  const [lists, setLists] = useState<ListType[]>([]);

  useEffect(() => {
    const noteflow = localStorage.getItem("noteflow");
    if (noteflow) {
      console.log(JSON.parse(noteflow));
      setLists(JSON.parse(noteflow));
    }
    // localStorage.setItem("noteflow", JSON.stringify(noteflow));
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  return (
    <main
      className="p-5 flex gap-10 flex-wrap justify-center items-start"
      onDragOver={handleDragOver}
    >
      {lists &&
        lists.map((list) => (
          <List
            id={list.id}
            key={list.id}
            title={list.title}
            description={list.description}
            tasks={list.tasks}
          />
        ))}
    </main>
  );
}

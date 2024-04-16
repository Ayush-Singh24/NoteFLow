"use client";

import { ListType } from "@/lib/constants";
import List from "./List";
import { useState } from "react";

export default function Main() {
  const noteflow = localStorage.getItem("noteflow");
  const [lists, setLists] = useState<ListType[]>(
    noteflow ? JSON.parse(noteflow) : []
  );
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  return (
    <main
      className="p-5 flex gap-10 flex-wrap justify-center items-start"
      onDragOver={handleDragOver}
    >
      <List title="To dos" description="Stuffs" tasks={["gaming", "coding"]} />
      <List title="To dos" description="Stuffs" tasks={["gaming", "coding"]} />
    </main>
  );
}

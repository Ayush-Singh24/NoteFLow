"use client";

import { ListType } from "@/lib/constants";
import List from "./List";
import { useEffect, useState } from "react";

export default function Main() {
  const [lists, setLists] = useState<ListType[]>([]);

  useEffect(() => {
    const noteflow = localStorage.getItem("noteflow");
    if (noteflow) {
      setLists(JSON.parse(noteflow));
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  return (
    <main
      className="p-5 flex gap-10 flex-wrap justify-center items-start"
      onDragOver={handleDragOver}
    >
      <List
        id={"123"}
        title="To dos"
        description="Stuffs"
        tasks={[
          { id: "123", value: "gaming" },
          { id: "456", value: "gaming" },
        ]}
      />
      <List
        id={"456"}
        title="To dos"
        description="Stuffs"
        tasks={[
          { id: "12", value: "gaming" },
          { id: "45", value: "gaming" },
        ]}
      />
    </main>
  );
}

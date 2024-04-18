"use client";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import { ListType } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [lists, setLists] = useState<ListType[]>([]);

  useEffect(() => {
    const noteflow = localStorage.getItem("noteflow");
    if (noteflow) {
      setLists(JSON.parse(noteflow));
    }
  }, []);

  const hanldleSetLists = (data: ListType[]) => {
    setLists(data);
  };

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar lists={lists} setLists={hanldleSetLists} />
      <Main lists={lists} setLists={hanldleSetLists} />
    </section>
  );
}

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
  const getListIndicators = () => {
    return Array.from(
      document.querySelectorAll<HTMLElement>(`[data-src="#list"]`)
    );
  };

  const nearestListIndicator = (
    e: React.DragEvent,
    indicators: HTMLElement[]
  ) => {
    const indicator = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offsetX = e.clientX - (box.right + 50);
        const offsetY = e.clientY - (box.bottom + 50);
        if (
          offsetX < 0 &&
          offsetX > closest.offsetX &&
          offsetY < 0 &&
          offsetY > closest.offsetY
        ) {
          return { offsetX: offsetX, offsetY: offsetY, element: child };
        } else {
          return closest;
        }
      },
      {
        offsetX: Number.NEGATIVE_INFINITY,
        offsetY: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return indicator;
  };

  const clearListHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getListIndicators();
    indicators.forEach((indicator) => {
      indicator.style.opacity = "0";
    });
  };

  const highlightListIndicators = (e: React.DragEvent) => {
    if (e.dataTransfer.types.includes("task")) return;
    const indicators = getListIndicators();
    if (indicators.length === 0) return;
    clearListHighlights(indicators);
    const nearestIndicator = nearestListIndicator(e, indicators);
    nearestIndicator.element.style.opacity = "1";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("list")) {
      highlightListIndicators(e);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    clearListHighlights();
    if (e.dataTransfer.types.includes("task")) return;
    if (e.dataTransfer.types.includes("list")) {
      const listInfo = JSON.parse(e.dataTransfer.getData("list")) as ListType;
      const indicators = getListIndicators();
      const { element: nearestElement } = nearestListIndicator(e, indicators);
      const before = nearestElement.dataset.beforelist;
      if (before !== listInfo.id) {
        let copy = [...lists];
        const newLists = copy.filter((c) => c.id !== listInfo.id);
        const moveToBack = before === "-1";
        if (moveToBack) {
          newLists.push(listInfo);
        } else {
          const insertAtIndex = newLists.findIndex((l) => l.id === before);
          newLists.splice(insertAtIndex, 0, listInfo);
        }
        setLists(newLists);
      }
    }
  };

  const handleDragLeave = () => {
    clearListHighlights();
  };

  return (
    <main
      className={`p-5 flex gap-5 flex-wrap justify-center items-start flex-1`}
      onDragOver={handleDragOver}
      onDrop={handleDragEnd}
      onDragLeave={handleDragLeave}
    >
      {lists &&
        lists.map((list, index, arr) => (
          <div
            key={list.id}
            className="w-full md:w-1/5 flex justify-between gap-2"
          >
            <DropListIndicator beforeId={list.id} />
            <List lists={lists} list={list} setLists={setLists} />
            <DropListIndicator
              beforeId={arr[index + 1] ? arr[index + 1].id : "-1"}
            />
          </div>
        ))}
    </main>
  );
}

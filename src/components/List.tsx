import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListType, TaskType } from "@/lib/constants";
import DropTaskIndicator from "./DropTaskIndicator";
import { CheckIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import React, { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { v4 as uuid } from "uuid";
export default function List({
  lists,
  list,
  setLists,
}: {
  lists: ListType[];
  list: ListType;
  setLists: (data: ListType[]) => void;
}) {
  const [showAddTaskInput, setShowTaskAddInput] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState<string>("");

  const getTaskIndicators = () => {
    return Array.from(
      document.querySelectorAll<HTMLElement>(`[task-list="${list.id}"]`)
    );
  };

  const getNearestTaskIndicator = (
    e: React.DragEvent,
    indicators: HTMLElement[]
  ) => {
    const indicator = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + 50);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return indicator;
  };

  const clearTaskHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getTaskIndicators();
    indicators.forEach((indicator) => {
      indicator.style.opacity = "0";
    });
  };

  const highlightTaskIndicator = (e: React.DragEvent) => {
    const indicators = getTaskIndicators();
    if (indicators.length === 0) return;
    clearTaskHighlights(indicators);
    const indicator = getNearestTaskIndicator(e, indicators);
    indicator.element.style.opacity = "1";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("deletetask")) {
      highlightTaskIndicator(e);
    }
  };

  const addTask = () => {
    if (taskInput.length === 0) return;
    const newTask: TaskType = { id: uuid(), value: taskInput };
    const newTasks: TaskType[] = [...list.tasks, newTask];
    const newList: ListType = { ...list, tasks: newTasks };
    const currListIndex = lists.findIndex((curr) => curr.id === list.id);
    const newLists = [...lists];
    newLists[currListIndex] = newList;
    setLists(newLists);
    setShowTaskAddInput(false);
  };

  const handleDragStart = (e: React.DragEvent, task: TaskType) => {
    e.dataTransfer.setData(
      "deletetask",
      JSON.stringify({ listId: list.id, taskId: task.id })
    );
  };

  const handleDragLeave = () => {
    clearTaskHighlights();
  };

  const handleDragEnd = () => {
    clearTaskHighlights();
  };

  return (
    <Card
      draggable
      className="w-full md:w-1/5 cursor-grab active:cursor-grabbing"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
    >
      <CardHeader>
        <CardTitle>{list.title}</CardTitle>
        {list.description && (
          <CardDescription>{list.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col">
        {list.tasks &&
          list.tasks.map((task) => (
            <div key={task.id}>
              <DropTaskIndicator beforeId={task.id} listId={list.id} />
              <p
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                className="cursor-grab active:cursor-grabbing p-1 rounded-full"
              >
                {task.value}
              </p>
              <DropTaskIndicator beforeId={"-1"} listId={list.id} />
            </div>
          ))}
        {showAddTaskInput && (
          <div className="flex gap-2 items-center">
            <Input
              className="p-1"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTaskInput(e.target.value)
              }
            />
            <Button onClick={addTask}>
              <CheckIcon />
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            !showAddTaskInput
              ? setShowTaskAddInput(true)
              : setShowTaskAddInput(false)
          }
        >
          {!showAddTaskInput ? <PlusIcon /> : <MinusIcon />}
        </Button>
      </CardFooter>
    </Card>
  );
}

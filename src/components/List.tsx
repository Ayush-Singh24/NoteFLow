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
import { ChangeEvent, useState } from "react";
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
  return (
    <Card
      draggable
      className="w-full md:w-1/5 cursor-grab active:cursor-grabbing"
      onDragOver={handleDragOver}
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

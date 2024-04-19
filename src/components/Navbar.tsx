import { PlusIcon } from "@radix-ui/react-icons";
import ThemeButton from "./ThemeButton";
import { Button } from "./ui/button";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./ui/modal";
import ListModal from "./ListModal";
import { ListType } from "@/lib/constants";

export default function Navbar({
  lists,
  setLists,
}: {
  lists: ListType[];
  setLists: (data: ListType[]) => void;
}) {
  const [listmodalStatus, setListModalStatus] = useState<boolean>(false);
  const [isTaskDragging, setIsTaskDragging] = useState<boolean>(false);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("task")) {
      setIsTaskDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.dataTransfer.types.includes("task")) {
      setIsTaskDragging(false);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.dataTransfer.types.includes("task")) {
      const deleteTaskInfo = JSON.parse(e.dataTransfer.getData("task")) as {
        listId: string;
        taskId: string;
      };
      console.log(deleteTaskInfo);
      const toBeEditedListIndex = lists.findIndex(
        (curr) => curr.id === deleteTaskInfo.listId
      );

      if (toBeEditedListIndex === -1) {
        return;
      }
      const newList = {
        ...lists[toBeEditedListIndex],
        tasks: lists[toBeEditedListIndex].tasks.filter(
          (task) => task.id !== deleteTaskInfo.taskId
        ),
      };

      const newLists = [...lists];
      newLists[toBeEditedListIndex] = newList;
      setLists(newLists);
      setIsTaskDragging(false);
    }
  };
  return (
    <>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full flex p-5 sticky top-0 z-10 backdrop-blur-md ${
          isTaskDragging ? "bg-red-100" : ""
        }`}
      >
        <div className="hidden md:block flex-1">Noteflow</div>
        <div className="w-full flex md:flex-1 justify-around md:justify-between md:gap-5 items-center">
          <Button
            variant={"ghost"}
            className="flex-1 md:flex-initial py-5 md:ml-auto"
            onClick={() => setListModalStatus(true)}
          >
            <PlusIcon className="block md:hidden" />
            <span className="hidden md:block">Add List</span>
          </Button>
          <ThemeButton
            variant={"ghost"}
            className="flex-1 py-5 md:flex-initial"
          />
        </div>
      </div>
      {listmodalStatus &&
        createPortal(
          <Modal
            isOpen={listmodalStatus}
            handleClose={() => setListModalStatus(false)}
          >
            <ListModal
              lists={lists}
              setLists={setLists}
              handleClose={() => setListModalStatus(false)}
            />
          </Modal>,
          document.body
        )}
    </>
  );
}

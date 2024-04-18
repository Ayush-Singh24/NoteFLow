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
  return (
    <>
      <div className="w-full flex p-5">
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

"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import ThemeButton from "./ThemeButton";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="w-full flex p-5">
      <div className="hidden md:block flex-1">Noteflow</div>
      <div className="w-full flex md:flex-1 justify-around md:gap-5 items-center">
        <Button variant={"ghost"} className="flex-1 py-5">
          <PlusIcon className="block md:hidden" />
          <span className="hidden md:block">Add List</span>
        </Button>
        <ThemeButton variant={"ghost"} className="flex-1 py-5" />
      </div>
    </div>
  );
}

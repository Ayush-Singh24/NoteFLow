import { ModalProps } from "@/lib/constants";
import { useEffect } from "react";
import { Button } from "./button";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function Modal({ children, isOpen, handleClose }: ModalProps) {
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      e.key === "Esc" ? handleClose() : null;
    };
    document.body.addEventListener("keydown", closeOnEsc);
    return () => document.body.removeEventListener("keydown", closeOnEsc);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-[2000] backdrop-blur-md flex justify-center items-center">
        <div className="flex flex-col max-w-[1170px] md:w-1/2 h-[40%] pd-5 md:p-10 mx-auto justify-center items-center gap-2">
          <Button
            className="self-end rounded-full"
            variant="link"
            onClick={handleClose}
            size={"icon"}
          >
            <Cross1Icon />
          </Button>
          <div className="max-h-[626px] opacity-100 w-full">{children}</div>
        </div>
      </div>
    </>
  );
}

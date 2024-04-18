import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";
import { ListType } from "@/lib/constants";
import { v4 as uuid } from "uuid";

export default function ListModal({
  lists,
  setLists,
  handleClose,
}: {
  lists: ListType[];
  setLists: (data: ListType[]) => void;
  handleClose: () => void;
}) {
  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setdescriptionInput] = useState<string>("");
  const handleAddList = () => {
    if (titleInput.length === 0) return;
    const newLists = [
      ...lists,
      {
        id: uuid(),
        title: titleInput,
        description: descriptionInput,
        tasks: [{ id: uuid(), value: "coding" }],
      },
    ];
    localStorage.setItem("noteflow", JSON.stringify(newLists));
    setLists(newLists);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Input
            placeholder="List Title"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitleInput(e.target.value)
            }
          />
        </CardTitle>
        <CardDescription>
          <Input
            placeholder="Card description"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setdescriptionInput(e.target.value)
            }
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Adding tasks here is to implemented</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            handleAddList();
            handleClose();
          }}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListType } from "@/lib/constants";
import DropTaskIndicator from "./DropTaskIndicator";
export default function List({ id, title, description, tasks }: ListType) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  return (
    <Card
      draggable
      className="w-full md:w-1/5 cursor-grab active:cursor-grabbing"
      onDragOver={handleDragOver}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {tasks &&
          tasks.map((task) => (
            <>
              <DropTaskIndicator beforeId={task.id} listId={id} />
              <p
                draggable
                key={task.id}
                className="cursor-grab active:cursor-grabbing"
              >
                {task.value}
              </p>
              <DropTaskIndicator beforeId={"-1"} listId={id} />
            </>
          ))}
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

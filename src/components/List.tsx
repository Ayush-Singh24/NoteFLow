import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListType } from "@/lib/constants";
export default function List({
  title,
  description,
  tasks,
}: Omit<ListType, "id">) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  return (
    <Card draggable className="w-full md:w-1/5" onDragOver={handleDragOver}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {tasks &&
          tasks.map((task) => (
            <p draggable key={task.id}>
              {task.value}
            </p>
          ))}
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListType } from "@/lib/constants";
export default function List({ id, title, description, tasks }: ListType) {
  return (
    <Card draggable={true} className="w-full md:w-1/5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {tasks && tasks.map((task) => <p key={task.id}>{task.value}</p>)}
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

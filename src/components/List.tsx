import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function List() {
  return (
    <Card className="w-full md:w-1/5">
      <CardHeader>
        <CardTitle>To Dos</CardTitle>
        <CardDescription>Things I need to do</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="rounded p-2 ">Card Content</p>
        <p className="rounded p-2 ">Card Content</p>
        <p className="rounded p-2 ">Card Content</p>
        <p className="rounded p-2 ">Card Content</p>
        <p className="rounded p-2 ">Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

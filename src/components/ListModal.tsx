import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ListModal() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>List Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Adding tasks here is to implemented</p>
      </CardContent>
      <CardFooter>
        <Button>Add</Button>
      </CardFooter>
    </Card>
  );
}

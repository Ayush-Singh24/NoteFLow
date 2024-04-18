import { ListType, noteflow } from "@/lib/constants";
import List from "./List";

export default function Main({
  lists,
  setLists,
}: {
  lists: ListType[];
  setLists: (data: ListType[]) => void;
}) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  return (
    <main
      className="p-5 flex gap-10 flex-wrap justify-center items-start"
      onDragOver={handleDragOver}
    >
      {lists &&
        lists.map((list) => (
          <List
            key={list.id}
            id={list.id}
            title={list.title}
            description={list.description}
            tasks={list.tasks}
          />
        ))}
    </main>
  );
}

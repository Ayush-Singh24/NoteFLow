export default function DropTaskIndicator({
  beforeId,
  listId,
}: {
  beforeId: string;
  listId: string;
}) {
  return (
    <div
      task-before={beforeId || "-1"}
      task-list={listId}
      className="my-0.5 h-0.5 w-full bg-white opacity-0"
    />
  );
}

export default function DropTaskIndicator({
  beforeId,
  listId,
}: {
  beforeId: string;
  listId: string;
}) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-list={listId}
      className="my-0.5 h-0.5 w-full bg-black dark:bg-white opacity-0 rounded"
    />
  );
}

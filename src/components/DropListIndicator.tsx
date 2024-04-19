export default function DropListIndicator({ beforeId }: { beforeId: string }) {
  return (
    <div
      data-beforelist={beforeId}
      data-src={"#list"}
      className="bg-white opacity-0 w-0.5 mx-0.5 rounded"
    />
  );
}

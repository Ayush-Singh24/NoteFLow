export type TaskType = {
  id: string;
  value: string;
};
export type ListType = {
  id: string;
  title: string;
  description?: string;
  tasks: TaskType[];
};

export const noteflow: ListType[] = [
  {
    id: "123",
    title: "To do",
    description: "asfasd fasdfasdf",
    tasks: [
      { id: "31412", value: "gaming" },
      { id: "31442", value: "gaming" },
      { id: "31312", value: "gaming" },
    ],
  },
  {
    id: "123123",
    title: "To do",
    description: "asfasd fasdfasdf",
    tasks: [
      { id: "31412", value: "gaming" },
      { id: "31442", value: "gaming" },
      { id: "31312", value: "gaming" },
    ],
  },
  {
    id: "123432",
    title: "To do",
    description: "asfasd fasdfasdf",
    tasks: [
      { id: "31412", value: "gaming" },
      { id: "31442", value: "gaming" },
      { id: "31312", value: "gaming" },
    ],
  },
];

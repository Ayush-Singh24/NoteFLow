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

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

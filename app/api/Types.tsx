export interface ChatDatas {
  id: number;
  attributes: {
    sender: string;
    message: string;
    time: string;
  }
}

export interface ReplyData {
  id: number;
  attributes: {
    chatId: number;
    sender: string;
    message: string;
    time: string;
  }
}

export interface NewChatMessage {
  sender: string;
  message: string;
}

export interface TasksData {
  id: number;
  attributes: {
    title: string;
    description: string;
    taskCreated: string;
  };
}

export interface TaskItemProps {
  taskId: number;
  title: string;
  description: string;
  taskCreated: string;
  isComplete: boolean;
  onDelete: () => void;
  setTasks: React.Dispatch<React.SetStateAction<TasksData[]>>;
  stickerOptions: string[];
}

export interface LoadingIndicatorProps {
  loadingText: string;
}
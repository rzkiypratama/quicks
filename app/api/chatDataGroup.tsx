export interface ChatData {
  id: number;
  sender: string;
  message: string;
  time: string;
  isNew?: boolean;
}

const chatDataGroup: ChatData[] = [
  {
    id: 1,
    sender: "You",
    message: "No Worries. It will be completed ASAP. I've asked him yesterday.",
    time: "19:32",
  },
];

export default chatDataGroup;
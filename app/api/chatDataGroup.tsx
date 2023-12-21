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
  {
    id: 2,
    sender: "Putra",
    message: "Morning. I'll try to do them. Thanks",
    time: "19:32",
  },
  {
    id: 3,
    sender: "Pratama",
    message: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
    time: "19:32",
  },
  {
    id: 4,
    sender: "You",
    message: "Yomaan",
    time: "19:32",
  },
];

export default chatDataGroup;

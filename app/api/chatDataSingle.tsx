export interface ChatData {
  id: number;
  sender?: string;
  message: string;
  time: string;
  isNew?: boolean;
  isReply?: boolean;
}


const chatData: ChatData[] = [
  {
    id: 1,
    sender: "You",
    message: "No Worries. It will be completed ASAP. I've asked him yesterday.",
    time: "19:32",
  },
  {
    id: 2,
    sender: "FastVisa Support",
    message: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
    time: "19:35",
  },
  {
    id: 3,
    sender: "FastVisa Support",
    message: "Morning. I'll try to do them. Thanks",
    time: "19:35",
  },
  {
    id: 4,
    sender: "FastVisa Support",
    message: "owrait brother",
    time: "19:35",
  },
  {
    id: 5,
    sender: "FastVisa Support",
    message: "Makan siang makan apa nich",
    time: "19:35",
  },
  {
    id: 6,
    sender: "You",
    message: "Lalapan enak deh, terus pulangnya ngopi cuy cihuy ga tuh",
    time: "19:35",
  },
  {
    id: 7,
    sender: "FastVisa Support",
    message: "Booleeeeeeh.",
    time: "19:35",
    // isNew: true,
  },
];

export default chatData;
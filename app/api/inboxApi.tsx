import axios from 'axios';
import {ChatDatas, NewChatMessage, ReplyData} from './Types'

const API_URL = `${process.env.QUICK_LOCAL_BACKEND_URL}`;

// INBOX API
export const fetchChatData = async (): Promise<ChatDatas[]> => {
  try {
    const response = await axios.get<{ data: ChatDatas[] }>(`${API_URL}/inboxes`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching chat data', error);
    return [];
  }
};

export const sendChatMessage = async (messageData: NewChatMessage): Promise<ChatDatas | null> => {
  try {
    const response = await axios.post<ChatDatas>(
      `${API_URL}/inboxes`,
      { data: messageData }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending chat message', error);
    return null;
  }
};

export const deleteChatMessage = async (chatId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/inboxes/${chatId}`);
  } catch (error) {
    console.error('Error deleting chat message', error);
  }
};

// REPLY API
export const fetchReplyMessages = async (): Promise<ReplyData[]> => {
  try {
    const response = await axios.get<{ data: ReplyData[] }>(`${API_URL}/replies`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching reply data', error);
    return [];
  }
};

export const sendReplyMessage = async (messageData: NewChatMessage): Promise<ChatDatas | null> => {
  try {
    const response = await axios.post<ChatDatas>(
      `${API_URL}/replies`,
      { data: messageData }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending chat message', error);
    return null;
  }
};


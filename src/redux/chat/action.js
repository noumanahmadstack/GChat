import Toast from 'react-native-simple-toast';
import { clearChatConversation, setChat, setChatConversation, setConversation, setIsLoading } from "./reducer"
import { getChat, getConversations, getLeads } from "../../api/chat/chatController";
import { store } from '../store/store';

export const getAllChat = async () => {
    let response = await getChat();
    if (response.status !== 'success') {
            store.dispatch(setChat(response?.data?.data?.chats))
    }
}
export const getAllLeads = async (_id) => {
    let response = await getLeads(_id);
    if (response.status !== 'success') {
             store.dispatch(setConversation(response?.data?.data?.leads))
    }
}

export const getAllConversation = async (project_id,lead_id) => {
    store.dispatch(setIsLoading(true))
    let response = await getConversations(project_id,lead_id);
    if (response.status !== 'success') {
             store.dispatch(setChatConversation(response?.data?.data?.conversation))
    }
    store.dispatch(setIsLoading(false))
}
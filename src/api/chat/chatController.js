import { get_request, get_request_withOutBearer } from "../requestHandlers/requests";
import { chat, conversation, lead } from "./target";

export const getChat = async () => {
    const data = await get_request({ target: chat});
    return data;
};
export const getLeads = async (_id) => {
    const project_id = _id
    const data = await get_request({target:lead+project_id});
    return data;
}

export const getConversations = async (project_id,lead_id) => {
    const data = await get_request({target:conversation+project_id+'/'+lead_id});
    return data;
}
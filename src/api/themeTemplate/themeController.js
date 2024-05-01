import {get_request} from "../requestHandlers/requests";
import { customTheme } from "./target";
export const getThemeTemplate = async () => {
    const data = await get_request({target: customTheme});
    return data
}
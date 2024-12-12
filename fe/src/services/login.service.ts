import {AxiosInstance} from "axios";

export function login(api: AxiosInstance): Promise<string> {
    return api.post('users/login', {id: Telegram.WebApp.initDataUnsafe.user?.id}).then(res => res.data)
}
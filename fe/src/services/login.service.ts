import {api} from "./api.service";

export function login(): Promise<string> {
    return api.post('users/login', {id: Telegram.WebApp.initDataUnsafe.user?.id}).then(res => res.data)
}
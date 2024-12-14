import {AxiosInstance} from "axios";

export function login(api: AxiosInstance): Promise<string> {
    return api.post('users/login', {
        id: Telegram.WebApp.initDataUnsafe.user?.id,
        first_name: Telegram.WebApp.initDataUnsafe.user?.first_name,
        last_name: Telegram.WebApp.initDataUnsafe.user?.last_name,
        username: Telegram.WebApp.initDataUnsafe.user?.username,
        language_code: Telegram.WebApp.initDataUnsafe.user?.language_code
    }).then(res => res.data)
}
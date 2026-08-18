import {AxiosInstance} from "axios";

/**
 * Registers the current Telegram user on first launch. The profile is read
 * server-side from the signed initData header, so nothing is sent in the body.
 */
export async function login(api: AxiosInstance): Promise<{ created: boolean }> {
    const res = await api.post('users/login');
    return res.data;
}

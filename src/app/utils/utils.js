import { cookies, headers } from "next/headers";

export const refreshToken = async () => {
    const newToken = "abc111";
    const cookieStore = await cookies();
    cookieStore.set("token", newToken);
    return newToken;
};

export const getToken = async () => {
    const cookieStore = await cookies();
    const allHeaders = await headers();
    // ưu tiên đọc token mới ở headers (cookies là token cũ)
    const token = allHeaders.get("x-token") || cookieStore.get("token")?.value;
    console.log(token);
};

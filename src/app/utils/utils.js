import { cookies } from "next/headers";

export const refreshToken = async () => {
    const newToken = "abc111";
    const cookieStore = await cookies();
    cookieStore.set("token", newToken);
};

export const getToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log(token);
};

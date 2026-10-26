import { NextResponse } from "next/server";
import { refreshToken } from "./app/utils/utils";

const isAuth = false;

export const proxy = async (request) => {
    // chuyển hướng
    if (!isAuth) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }
    // Check profile --> 401
    const newToken = await refreshToken();
    const allHeaders = request.headers;
    allHeaders.set("x-token", newToken);
    const response = NextResponse.next({
        request: {
            headers: allHeaders,
        },
    });
    return response;
};

// bắt đầu bằng /posts /todos
export const config = {
    matcher: ["/posts/:path*", "/todos/:path*"],
};

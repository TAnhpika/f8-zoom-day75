import { NextResponse } from "next/server";
import { refreshToken } from "./app/utils/utils";

export const proxy = async (request) => {
    // const pathname = request.nextUrl.pathname;
    // console.log(`proxy: `, pathname);
    // console.log(request);

    // const host = request.headers.get("host");
    // console.log(host);

    // request header
    // const allHeaders = request.headers;
    // allHeaders.set("x-token", "abc123");
    // const name = request.cookies.get("name");
    // console.log(name);

    // response header
    const response = NextResponse.next({
        // request: {
        //     headers: allHeaders,
        // },
    });
    // response.headers.set("x-abc", "anhpika");
    // response.cookies.set("token", "anhpika-token", {
    //     httpOnly: true,
    // });

    await refreshToken()
    return response;
};

// bắt đầu bằng /posts /todos
export const config = {
    matcher: ["/posts/:path*", "/todos/:path*"],
};

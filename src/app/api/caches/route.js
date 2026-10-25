import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// call = postman
export const DELETE = async (request) => {
    const { type, value } = await request.json();
    if (type === "path") {
        revalidatePath(value);
        return NextResponse.json({
            success: true,
        });
    }
    if (type === "tag") {
        revalidateTag(value, {
            expire: 0,
        });
        return NextResponse.json({
            success: true,
        });
    }
    return NextResponse.json(
        {
            success: false,
        },
        {
            status: 500,
        },
    );
};

// DELETE /api/caches
// Body:
//      - type: path, tag
//      - value:

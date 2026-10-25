import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
    const { type, value } = await request.json();
    if (type === "path") {
        revalidatePath(value);
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

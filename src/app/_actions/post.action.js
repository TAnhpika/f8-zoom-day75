"use server";

import { revalidatePath } from "next/cache";

export const createPost = async (prevState, formData) => {
    const title = formData.get("title");

    if (!title) {
        return {
            message: "Title is required",
        };
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/posts`,
        {
            method: "POST",
            body: JSON.stringify({ title }),
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    if (!response.ok) {
        return {
            message: "Server error",
        };
    }

    revalidatePath("/posts");

    return {
        message: "Create post success",
    };
};

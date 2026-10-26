"use client";

import { use } from "react";
import { deletePost } from "../_actions/post.action";
import { AppContext } from "../_components/AppProvider";

export default function DeleteButton({ postId }) {
    const { message } = use(AppContext);
    console.log(message);

    return (
        <button
            onClick={() => deletePost(postId)}
            className="px-2 py-1 text-white bg-red-600"
        >
            Delete
        </button>
    );
}

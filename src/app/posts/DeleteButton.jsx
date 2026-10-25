"use client";

import { deletePost } from "../_actions/post.action";

export default function DeleteButton({ postId }) {
    return (
        <button
            onClick={() => deletePost(postId)}
            className="px-2 py-1 text-white bg-red-600"
        >
            Delete
        </button>
    );
}

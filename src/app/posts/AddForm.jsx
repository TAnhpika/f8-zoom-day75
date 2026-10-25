"use client";

import { useActionState } from "react";
import { createPost } from "../_actions/post.action";

export default function AddForm() {
    const [state, action, pending] = useActionState(createPost, {});

    return (
        <form action={action}>
            <div className="mb-3">
                <label className="block mb-1 font-medium">Title</label>
                <input
                    type="text"
                    className="px-3 py-2 w-full outline-none border border-[#ddd]"
                    name="title"
                    placeholder="Title..."
                />
            </div>
            <button className="px-3 py-2 bg-green-600 text-white">
                {pending ? "Saving..." : "Save"}
            </button>
            {state.message && (
                <span className="block mt-1 text-green-600">
                    {state.message}
                </span>
            )}
        </form>
    );
}

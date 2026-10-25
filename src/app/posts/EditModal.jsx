"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { updatePost } from "../_actions/post.action";

export default function EditModal({ postId }) {
    const [showModal, setShowModal] = useState(false);
    const [post, setPost] = useState({});

    useEffect(() => {
        const handleKeyUp = (e) => {
            if (e.key === "Escape") {
                setShowModal(false);
            }
        };
        document.addEventListener("keyup", handleKeyUp);

        const getPost = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_API}/posts/${postId}`,
            );
            if (!response.ok) {
                throw new Error("Có lỗi khi lấy chi tiết post");
            }
            const data = await response.json();
            setPost(data);
        };
        getPost();

        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [postId]);

    return (
        <>
            <button
                className="px-2 py-1 text-white bg-amber-600"
                onClick={() => setShowModal(true)}
            >
                Edit
            </button>
            {showModal && (
                <>
                    <div className="fixed left-0 right-0 top-[10%] max-w-1/2 mx-auto bg-white p-3 border border-[#ddd] z-9999 ">
                        <form
                            action={async (formData) => {
                                const { success } = await updatePost(formData);
                                if (success) {
                                    setShowModal(false);
                                }
                            }}
                        >
                            <div className="mb-3">
                                <label className="block mb-1 font-medium">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="px-3 py-2 w-full outline-none border border-[#ddd]"
                                    name="title"
                                    placeholder="Title..."
                                    defaultValue={post.title}
                                    autoFocus
                                />
                            </div>
                            <input
                                type="hidden"
                                name="id"
                                defaultValue={post.id}
                            />
                            <button className="px-3 py-2 bg-green-600 text-white">
                                Save
                            </button>
                        </form>
                    </div>
                    <div
                        className="fixed inset-0 bg-[#00000070] z-999"
                        onClick={() => setShowModal(false)}
                    />
                </>
            )}
        </>
    );
}

import { cacheTag } from "next/cache";
import AddForm from "./AddForm";
import DeleteButton from "./DeleteButton";
import EditModal from "./EditModal";
// import { cookies } from "next/headers";
// import { Suspense } from "react";
// import { getToken } from "../utils/utils";

// async function CookieDebug() {
//     await getToken();

//     return null;
// }

const getPosts = async () => {
    "use cache";
    cacheTag("posts:list");

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/posts`);
    if (!response.ok) {
        throw new Error("Có lỗi khi lấy danh sách posts");
    }
    return response.json();
};

export default async function PostsPage() {
    console.log("Posts page");

    const posts = await getPosts();

    return (
        <div>
            {/* <Suspense fallback={null}>
                <CookieDebug />
            </Suspense> */}
            <h1 className="text-3xl mb-3">Posts</h1>
            {posts.map((post) => (
                <div key={post.id} className="mb-3 border-b border-[#ccc] pb-3">
                    <h2>{post.title}</h2>
                    <div className="flex mt-3 gap-3">
                        <EditModal postId={post.id} />
                        <DeleteButton postId={post.id} />
                    </div>
                </div>
            ))}
            <AddForm />
        </div>
    );
}

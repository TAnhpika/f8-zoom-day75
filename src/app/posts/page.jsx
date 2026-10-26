import { Suspense } from "react";
import AddForm from "./AddForm";
import DeleteButton from "./DeleteButton";
import EditModal from "./EditModal";

const getPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/posts`, {
        // cache: "no-store",
        next: {
            tags: ["posts:list"],
            revalidate: 15
        }
    });
    if (!response.ok) {
        throw new Error("Có lỗi khi lấy danh sách posts");
    }
    return response.json();
};

async function PostsList() {
    const posts = await getPosts();

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="mb-3 border-b border-[#ccc] pb-3">
                    <h2>{post.title}</h2>
                    <div className="flex mt-3 gap-3">
                        <EditModal postId={post.id} />
                        <DeleteButton postId={post.id} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function PostsPage() {
    console.log("Posts page");

    return (
        <div>
            <h1 className="text-3xl mb-3">Posts</h1>
            <Suspense fallback={<p>Loading posts...</p>}>
                <PostsList />
            </Suspense>
            <AddForm />
        </div>
    );
}

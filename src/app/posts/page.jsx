import AddForm from "./AddForm";
import DeleteButton from "./DeleteButton";

const getPosts = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/posts`,
        {
            cache: "force-cache",
            next: {
                tags: ["posts:list"],
            },
        },
    );
    if (!response.ok) {
        throw new Error("Có lỗi khi lấy danh sách posts");
    }
    return response.json();
};

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <div>
            <h1 className="text-3xl mb-3">Posts</h1>
            {posts.map((post) => (
                <div key={post.id} className="mb-3 border-b border-[#ccc] pb-3">
                    <h2>{post.title}</h2>
                    <div className="flex mt-3 gap-3">
                        <button className="px-2 py-1 text-white bg-amber-600">
                            Edit
                        </button>
                        <DeleteButton postId={post.id} />
                    </div>
                </div>
            ))}
            <AddForm />
        </div>
    );
}

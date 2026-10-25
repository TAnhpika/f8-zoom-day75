import fs from "fs/promises";
import { cacheTag } from "next/cache";
import path from "path";

const getTodoList = async () => {
    "use cache";
    cacheTag("todos:list");
    const dataPath = path.join(process.cwd(), "src", "data", "todos.json");
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
};

export default async function TodosPage() {
    const todoList = await getTodoList();
    return (
        <div>
            <h1 className="text-3xl mb-3">Todos</h1>
            {todoList.map((todo) => (
                <h2 className="text-xl" key={todo.id}>
                    {todo.title}
                </h2>
            ))}
        </div>
    );
}

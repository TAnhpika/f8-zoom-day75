import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";

const getProducts = async (q = "") => {
    "use cache"
    const response = await fetch(
        `${process.env.SERVER_API}/products/search?q=${q}`,
    );
    if (!response.ok) {
        throw new Error("Fetching products error");
    }
    const { products } = await response.json();
    return products;
};

export default async function ProductsPage({ searchParams }) {
    const { q } = await searchParams;
    const products = await getProducts(q);

    return (
        <div>
            <h1 className="text-3xl mb-3">Products</h1>
            <SearchInput />
            <p className="text-lg">Tìm kiếm: {q}</p>

            <div className="flex flex-wrap">
                {products.map((product) => (
                    <div key={product.id} className="w-1/4">
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={300}
                            height={300}
                        />
                        <h2>
                            <Link href={`/products/${product.id}`}>
                                {product.title}
                            </Link>
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

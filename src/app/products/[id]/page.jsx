import { notFound } from "next/navigation";
import { cache, Suspense } from "react";
import ProductImage from "./ProductImage";

const getProduct = cache(async (id) => {
    "use cache";
    const response = await fetch(`${process.env.SERVER_API}/products/${id}`);
    if (response.status === 404) {
        return;
    }
    if (!response.ok) {
        throw new Error("Fetching products error");
    }
    return await response.json();
});

export const generateMetadata = async ({ params }) => {
    const { id } = await params;
    const product = await getProduct(id);
    return {
        title: product.title,
    };
};

async function ProductContent({ paramsPromise }) {
    const { id } = await paramsPromise;
    const product = await getProduct(id);
    if (!product) {
        return notFound();
    }
    return (
        <div>
            <h1>{product.title}</h1>
            <p>{product.price.toLocaleString()}$</p>
            <ProductImage product={product} />
        </div>
    );
}

export default function ProductDetailPage({ params }) {
    return (
        <Suspense fallback={<p>Loading product...</p>}>
            <ProductContent paramsPromise={params} />
        </Suspense>
    );
}

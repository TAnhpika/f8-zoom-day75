"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductImage({ product }) {
    const [selectedImage, setSelectedImage] = useState(product.thumbnail);
    return (
        <>
            <Image
                src={selectedImage}
                alt={product.title}
                width={400}
                height={300}
            />

            <div className="flex gap-2">
                {product.images.map((image, index) => (
                    <Image
                        onClick={() => setSelectedImage(image)}
                        className="cursor-pointer hover:opacity-50"
                        key={index}
                        src={image}
                        alt={product.title}
                        width={100}
                        height={100}
                    />
                ))}
            </div>
        </>
    );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    partialPrefetching: true,
    reactCompiler: true,
    cacheComponents: true,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
    images: {
        remotePatterns: [
            {
                hostname: "cdn.dummyjson.com",
            },
        ],
    },
};

export default nextConfig;

"use client";

import { useRouter } from "next/navigation";


const debounce = (fn, timeout = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, timeout);
    };
};

export default function SearchInput() {
    const router = useRouter();
    return (
        <input
            type="search"
            className="block my-3 px-3 py-2 border border-[#ccc] outline-0 w-full"
            placeholder="Nhập từ khóa..."
            onChange={debounce((e) => {
                router.push(`?q=${e.target.value}`);
            })}
        />
    );
}

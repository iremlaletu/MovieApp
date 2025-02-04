"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const searchMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim().length > 0) {
      router.push(`/search/${keyword}`);
      setKeyword("");
    }
  };
  return (
    <header className="w-full p-4 flex items-center justify-between">
      <Link href="/">
        <h1 className="text-xl font-semibold">movielt</h1>
      </Link>

      <div className="flex items-center gap-2">
        <form onSubmit={searchMovie}>
          <input
            type="text"
            value={keyword}
            placeholder="Search Movies..."
            onChange={(e) => setKeyword(e.target.value)}
            className=" border-b px-3 py-2  text-black outline-none w-48 bg-transparent "
          />
          <button className="border px-4 py-2 rounded-lg hover:bg-slate-500">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

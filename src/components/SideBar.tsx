import { genres } from "@/constants";
import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="w-[200px] h-full p-4 border-r hidden md:block">
      <div className="flex flex-col gap-5 ml-2">
        <h1 className="bg-slate-600 text-white text-center"> Categories</h1>
        {genres.map((genre) => (
          <Link key={genre.id} href={`/genre/${genre.id}`} prefetch={false}>
            <p className="uppercase">{genre.name}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;

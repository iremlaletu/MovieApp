import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="relative w-full h-96 bg-[#333] rounded-xl overflow-hidden">
        <Image
          src={
            movie.poster_path || movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${
                  movie.poster_path || movie.backdrop_path
                }`
              : "/defaultMovie.jpg"
          }
          alt={movie.title}
          width={500}
          height={750}
          className="w-full h-full object-cover object-top transform transition-all duration-300 ease-in-out hover:scale-105"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#000] to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-gray-300 z-10">
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p className="text-sm mt-1">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
}

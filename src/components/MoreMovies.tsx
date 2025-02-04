"use client";
import { fetchMovieByGenre } from "@/fetch/fetch";
import { Movie } from "@/types";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Loader2Icon } from "lucide-react";
import { useInView } from "react-intersection-observer";

let page = 2;

const MoreMovies = ({ id }: { id: string }) => {
  const { ref, inView } = useInView();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (inView) {
      fetchMovieByGenre(id, page).then((res) => {
        setMovies((prevMovies) => {
          const updatedMovies = [
            ...prevMovies,
            ...res.results.filter(
              (movie: Movie) =>
                !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
            ),
          ];
          return updatedMovies;
        });
        page++;
      });
    }
  }, [inView, id]);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <section className="flex p-8 justify-center items-center w-full">
        <div ref={ref}>
          <Loader2Icon className="size-14 text-gray-300 animate-spin" />
        </div>
      </section>
    </>
  );
};

export default MoreMovies;

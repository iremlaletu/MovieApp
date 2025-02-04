import MovieCard from "@/components/MovieCard";
import { fetchSearchMovies } from "@/fetch/fetch";
import { Movie } from "@/types";

type Props = {
  params: Promise<{ keyword: string }>;
};

export default async function SearchPage({ params }: Props) {
  const resolvedKeyword = await params;
  const moviekeyword = String(resolvedKeyword.keyword);
  const movies = await fetchSearchMovies(moviekeyword);
  const trimKeyword = moviekeyword.replace(/%20/g, " ").trim();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Search Results for: {trimKeyword}</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies && movies.results.length > 0 ? (
          movies.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found for this search.</p>
        )}
      </div>
    </div>
  );
}

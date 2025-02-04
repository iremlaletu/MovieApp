import MoreMovies from "@/components/MoreMovies";
import MovieCard from "@/components/MovieCard";
import { genres } from "@/constants";
import { fetchMovieByGenre } from "@/fetch/fetch";
import { Movie } from "@/types";

type Props = {
  params: Promise<{ genreId: string }>;
};

export default async function Page({ params }: Props) {
  const { genreId } = await params;
  const numericGenreId = parseInt(genreId);
  if (!genreId) {
    return <p>Genre ID is missing!</p>;
  }
  const movies = await fetchMovieByGenre(genreId);
  const genre = genres.find((genre) => genre.id === numericGenreId);
  return (
    <div>
      <h2 className="text-5xl font-extrabold ">{genre?.name} Movies</h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies && movies.results.length > 0 ? (
          movies.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found for this genre.</p>
        )}
      </div>
      <MoreMovies id={genreId} />
    </div>
  );
}

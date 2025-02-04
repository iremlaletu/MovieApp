import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/fetch/fetch";
import Rows from "./Rows";

export default async function RowsContainer() {
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const upcomingMovies = await getUpcomingMovies();

  return (
    <section className="py-6 md:py-12 flex flex-col gap-y-10">
      <Rows title="Popular Now" data={popularMovies.results} />
      <Rows title="Top Rated" data={topRatedMovies.results} />
      <Rows title="Coming Soon" data={upcomingMovies.results} />
    </section>
  );
}

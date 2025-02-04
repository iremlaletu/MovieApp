import {
  fetchMovieById,
  fetchMovieByIdCredit,
  fetchMovieByIdReviews,
  fetchMovieByIdVideos,
  fetchRecomendation,
} from "@/fetch/fetch";
import { CastMember, CommentResults, CrewMember } from "@/types";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Image from "next/image";
import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import Rows from "@/components/Rows";
import Reviews from "@/components/Reviews";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CastDetails from "@/components/CastDetails";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: Props) {
  const { id: movieId } = await params;
  const [movie, recommendations, reviews, credits, videoData] =
    await Promise.all([
      fetchMovieById(movieId),
      fetchRecomendation(movieId),
      fetchMovieByIdReviews(movieId),
      fetchMovieByIdCredit(movieId),
      fetchMovieByIdVideos(movieId),
    ]);

  const reviewsResult: CommentResults = reviews.results;

  const crew: CrewMember[] = credits?.crew || [];
  const cast: CastMember[] = credits?.cast || [];

  // Yönetmen ve yazarları al
  const directors = crew.filter((person) => person.job === "Director");
  const writers = crew.filter((person) => person.department === "Writing");

  // Benzersiz listeyi saklamak için bir Map oluştur
  const uniqueCrewMap = new Map<number, CrewMember>();

  // Yönetmenleri ekle
  directors.forEach((person) => {
    uniqueCrewMap.set(person.id, { ...person, job: "Director" });
  });

  // Yazarları ekle ve aynı kişi varsa job'u birleştir
  writers.forEach((person) => {
    if (uniqueCrewMap.has(person.id)) {
      uniqueCrewMap.get(person.id)!.job += ` / ${person.job}`;
    } else {
      uniqueCrewMap.set(person.id, {
        ...person,
        job: ` Writing / ${person.job}`,
      });
    }
  });

  // benzersiz liste
  const uniqueDirectorsAndWriters = Array.from(uniqueCrewMap.values());

  const firstFiveCast = cast.slice(0, 10);

  const firstVideoKey =
    videoData.results.length > 0 ? videoData.results[0].key : null;

  return (
    <>
      <Card className="w-full flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 relative">
          <Image
            src={
              movie.poster_path || movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original/${
                    movie.poster_path || movie.backdrop_path
                  }`
                : "/defaultMovie.jpg"
            }
            alt={movie.title}
            width={1200}
            height={500}
            className="object-cover object-top w-full h-full max-h-[90vh]"
            priority
          />
        </div>
        <div className="flex-1 p-6 flex flex-col gap-4">
          <CardTitle className="text-3xl font-bold text-gray-900 ">
            {movie.title}
          </CardTitle>
          <CardDescription>
            <Breadcrumb className="flex flex-wrap gap-2 text-gray-700 ">
              {movie.genres.map((genre, index) => (
                <BreadcrumbList key={index} className="font-semibold">
                  <BreadcrumbItem>{genre.name}</BreadcrumbItem>
                  {index < movie.genres.length - 1 && (
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                  )}
                </BreadcrumbList>
              ))}
            </Breadcrumb>
          </CardDescription>
          <Breadcrumb className="flex flex-wrap text-gray-700">
            <BreadcrumbList className="font-semibold">
              <BreadcrumbItem>
                Origin Country: {movie.origin_country.join(", ")}
              </BreadcrumbItem>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              <BreadcrumbItem>
                Language: {movie.original_language.toUpperCase()}
              </BreadcrumbItem>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              <BreadcrumbItem>
                Release Date: {movie.release_date.split("-")[0]}
              </BreadcrumbItem>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              <BreadcrumbItem>Duration: {movie.runtime} MIN.</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ScrollArea className="w-full max-w-full overflow-x-auto mt-4">
            <div className="flex gap-4">
              {uniqueDirectorsAndWriters.map((person, idx) => (
                <div key={idx} className="flex flex-col items-center w-28">
                  <Image
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                        : "/defaultAvatar.png"
                    }
                    alt={person.name}
                    className="rounded-lg shadow-md w-[100px] h-[130px] object-cover"
                    width={100}
                    height={130}
                    priority
                  />
                  <p className="text-xs mt-1 text-center">{person.name}</p>
                  <div className="text-xs text-center">
                    {person.job.split(" / ").map((jobTitle, jobIdx) => (
                      <p key={jobIdx}>{jobTitle}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <p className="mt-4 text-gray-700">{movie.overview}</p>
          <div className="mt-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Play Trailer</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogTitle> Official Trailer</DialogTitle>
                <DialogDescription> {movie.title} </DialogDescription>
                <div className="mt-4">
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${firstVideoKey}`}
                    className="rounded-lg"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
            <Rating rate={movie.vote_average} />
          </div>
        </div>
      </Card>
      <div className="mt-12">
        <CastDetails cast={firstFiveCast} />
      </div>
      <div className="mt-12">
        <Reviews reviews={reviewsResult} />
      </div>
      <div className="mt-12">
        <Rows title="Similar Movies" data={recommendations.results} />
      </div>
    </>
  );
}

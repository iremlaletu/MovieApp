import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { getNowPlayingMovies } from "@/fetch/fetch";
import { ArrowDown, Slash } from "lucide-react";
import { Movie } from "@/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { genres } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default async function Banner() {
  const fetchMovies = await getNowPlayingMovies();
  const resultMovies: Movie[] = fetchMovies.results;
  return (
    <>
      <h1 className="text-5xl font-extrabold flex flex-row">
        Now Playing <ArrowDown className="animate-bounce" />
      </h1>

      <Carousel className="w-full max-w-md md:max-w-lg lg:max-w-5xl xl:max-w-full mx-auto">
        <CarouselContent>
          {resultMovies.map((movie) => (
            <CarouselItem key={movie.id} className="w-full">
              <Card className="w-full h-[750px]">
                <CardContent className="relative w-full h-full">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${
                      movie.backdrop_path || movie.poster_path
                    }`}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="absolute inset-0 brightness-50 rounded-lg object-cover object-top"
                    priority
                  />

                  <div className="absolute inset-0 flex flex-col justify-center">
                    <div className="text-center text-white space-y-3">
                      <h1 className="text-4xl font-bold">{movie.title}</h1>
                      <p className=" text-sm ">{movie.release_date}</p>

                      <Breadcrumb className="flex justify-center">
                        <BreadcrumbList>
                          {movie.genre_ids.map(
                            (genreID: number, index: number) => (
                              <div
                                key={genreID}
                                className="flex items-center space-x-2"
                              >
                                <BreadcrumbItem className="text-white">
                                  {
                                    genres.find((genre) => genre.id === genreID)
                                      ?.name
                                  }
                                </BreadcrumbItem>

                                {index < movie.genre_ids.length - 1 && (
                                  <BreadcrumbSeparator>
                                    <Slash className="text-white" />
                                  </BreadcrumbSeparator>
                                )}
                              </div>
                            )
                          )}
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>

                    <p className="text-slate-300 font-semibold absolute bottom-0 left-0 p-6 max-w-lg break-words">
                      {movie.overview}...
                      <Link className="text-white" href={`/movie/${movie.id}`}>
                        See details
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="w-fit md:mx-auto flex space-x-10 mt-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </>
  );
}

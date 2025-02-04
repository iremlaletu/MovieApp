import { CastMember } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CircleUser } from "lucide-react";
import Image from "next/image";

const CastDetails = ({ cast }: { cast: CastMember[] }) => {
  return (
    <div className="max-w-7xl mx-auto px-2 ">
      <h3 className="text-2xl mb-5 flex flex-row items-center gap-2">
        <CircleUser /> Stars
      </h3>
      <div className="mt-5">
        {cast.length === 0 ? (
          <p>No cast info available..</p>
        ) : (
          <ScrollArea className="w-full max-w-5xl h-72 overflow-x-auto mx-auto border">
            <div className="flex space-x-4 p-4">
              {cast.map((castMember) => (
                <div
                  key={castMember.id}
                  className="flex flex-col items-center shrink-0"
                >
                  <div className="relative w-[128px] aspect-[4/5] overflow-hidden rounded-md">
                    <Image
                      src={
                        castMember.profile_path
                          ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
                          : "/defaultAvatar.png"
                      }
                      alt={castMember.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100px, (max-width: 1200px) 128px, 160px"
                    />
                  </div>
                  <figcaption className=" flex flex-col  pt-2 text-xs text-muted-foreground">
                    <p>{castMember.name}</p> - <p> {castMember.character} </p>
                  </figcaption>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default CastDetails;

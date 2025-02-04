import { CommentResults } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Star } from "lucide-react";

interface ReviewsProps {
  reviews: CommentResults;
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div className="max-w-7xl mx-auto px-2 ">
      <h3 className="text-2xl mb-5 flex flex-row items-center gap-2">
        <Eye /> Reviews
      </h3>
      {reviews.length === 0 ? (
        <p>No reviews for this movie...</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-6 max-w-5xl mx-auto border-b-2">
            <div className="mb-3 self-center">
              <Avatar>
                <AvatarImage
                  src={
                    review.author_details?.avatar_path
                      ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                      : "/defaultAvatar.png"
                  }
                  alt={review.author}
                />
                <AvatarFallback className="border-2">
                  {review.author.split("")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold text-lg">{review.author}</h3>
                <p className="flex items-center text-sm">
                  {review.author_details?.rating} <Star />
                </p>
              </div>
            </div>

            <p className="line-clamp-3">{review.content}</p>

            <small className="text-gray-500">
              {new Date(review.created_at).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;

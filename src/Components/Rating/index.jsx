import { useState } from "react";
import { Star } from "lucide-react";

const Rating = ({ maxStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex flex-row items-center gap-1">
      {[...Array(maxStars)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <Star
            key={starIndex}
            className={`mt-2 w-8 h-8 cursor-pointer transition-all ${
              starIndex <= rating ? "fill-yellow-400 stroke-yellow-400" : "fill-none stroke-gray-400"
            }`}
            onClick={() => handleRating(starIndex)}
          />
        );
      })}
    </div>
  );
};

export default Rating;


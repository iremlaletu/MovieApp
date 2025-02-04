interface RatingProps {
  rate: number;
}
const Rating = ({ rate }: RatingProps) => {
  const maxStars = 10;
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <svg
        key={i}
        style={{ width: "1.5rem", height: "1.5rem" }}
        viewBox="0 0 24 24"
        fill={i <= rate ? "black" : "#e4e5e9"}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l4.46 3.73L4.82 21z" />
      </svg>
    );
  }

  return <div style={{ display: "flex" }}>{stars}</div>;
};
export default Rating;

const RatingProgress = ({ rating, textColor = "black", className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 50 50"
      className={`p-0.5 rounded-full ${className}`}
    >
      <circle
        cx="25"
        cy="25"
        r="24"
        strokeWidth="8"
        stroke={
          isNaN(Number(rating)) || Number(rating) === 0
            ? "gray"
            : rating < 4
            ? "#DC3545"
            : rating < 7
            ? "#FFCC00"
            : "#4BB543"
        }
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-90 25 25)"
        strokeDasharray={`${rating * 10} 100`}
        pathLength="100"
      />
      <text
        fill={textColor}
        x="25"
        y="25"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {(rating || 0).toFixed(1)}
      </text>
    </svg>
  );
};

export default RatingProgress;

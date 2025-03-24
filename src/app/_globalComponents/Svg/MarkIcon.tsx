const MarkIcon = () => {
  return (
    <svg
      aria-label="Close"
      className="w-4 h-4 stroke-current" // Tailwind classes for size and color
      role="img"
      viewBox="0 0 24 24"
    >
      <title>Close</title>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="3"
        y2="21"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="21"
        y2="3"
      />
    </svg>
  );
};

export default MarkIcon;

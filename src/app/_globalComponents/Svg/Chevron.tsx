export type ChevronRotateType = 0 | 180;

const Chevron = ({ rotate }: { rotate: ChevronRotateType }) => {
  return (
    <svg
      aria-label="Down chevron icon"
      className="w-4 h-4 fill-curren transition-transform"
      style={{ transform: `rotate(${rotate}deg)` }}
      role="img"
      viewBox="0 0 24 24"
    >
      <title>Down chevron icon</title>
      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
    </svg>
  );
};

export default Chevron;

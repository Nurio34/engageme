function AddFavoritesButton() {
  return (
    <li className="py-1 h-12 border-b">
      <button
        type="button"
        className="w-full h-full flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Add to favorites xx
      </button>
    </li>
  );
}
export default AddFavoritesButton;

function CloseSlider() {
  return (
    <div
      className=" md:hidden absolute top-0 left-0 -translate-x-full w-6 h-full bg-base-content rounded-tl-lg rounded-bl-lg
        flex justify-center items-center gap-1
      "
    >
      <div className="h-1/6 border-l-2 border-base-100 " />
      <div className="h-1/6 border-l-2 border-base-100" />
    </div>
  );
}
export default CloseSlider;

import { useAppSelector } from "@/store/hooks";

function Search() {
  const { device } = useAppSelector((s) => s.modals);

  const isMobile = device.type === "mobile";

  return (
    isMobile && (
      <input
        type="text"
        name="search"
        id="search"
        className="input input-sm bg-base-300 grow"
      />
    )
  );
}
export default Search;

import SeeAllButton from "./SeeAllButton";

function Header() {
  return (
    <div className="flex justify-between items-center pb-4 font-semibold px-4 lg:px-0">
      <p>Suggested for you</p>
      <SeeAllButton />
    </div>
  );
}
export default Header;

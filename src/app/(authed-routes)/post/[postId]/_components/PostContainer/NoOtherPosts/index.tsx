import Header from "./Header";
import SuggestedForYou from "./SuggestedForYou";

function NoOtherPosts() {
  const maxWidth = 935;

  return (
    <section className="flex justify-center">
      <div className="w-full bg-red-100" style={{ maxWidth }}>
        <Header />
        <SuggestedForYou maxWidth={maxWidth} />
      </div>
    </section>
  );
}
export default NoOtherPosts;

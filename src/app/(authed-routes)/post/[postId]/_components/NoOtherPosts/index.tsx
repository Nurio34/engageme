import Header from "./Header";
import SuggestedForYou from "../../../../_globalComponents/SuggestedForYou";

function NoOtherPosts() {
  const maxWidth = 935;

  return (
    <section className="flex justify-center">
      <div style={{ maxWidth }}>
        <Header />
        <SuggestedForYou maxWidth={maxWidth} />
      </div>
    </section>
  );
}
export default NoOtherPosts;

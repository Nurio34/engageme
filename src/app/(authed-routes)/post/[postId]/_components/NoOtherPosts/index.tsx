import Header from "./Header";
import SuggestedForYou from "../../../../_globalComponents/SuggestedForYou";
import SuggestedForYouModal from "@/app/(authed-routes)/_globalComponents/SuggestedForYouModal";

function NoOtherPosts() {
  const suggestedForYouMaxWidth = 935;
  const suggestedForYouModalMaxWidth = 560;

  return (
    <section className="flex justify-center">
      <div style={{ maxWidth: suggestedForYouMaxWidth }}>
        <Header />
        <SuggestedForYou maxWidth={suggestedForYouMaxWidth} />
        <SuggestedForYouModal maxWidth={suggestedForYouModalMaxWidth} />
      </div>
    </section>
  );
}
export default NoOtherPosts;

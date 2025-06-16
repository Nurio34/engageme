import {
  PrismaMediaType,
  PrismaPostType,
} from "../../../../../../../../../prisma/types/post";
import Medias from "./Medias";
import PostActions from "./PostActions";

function DesktopVersion({ post }: { post: PrismaPostType }) {
  const { medias } = post;

  return (
    <section className="flex justify-center lg:py-9">
      <div className="h-screen lg:max-h-[599] flex flex-col lg:flex-row">
        <Medias medias={medias} />
        <PostActions />
      </div>
    </section>
  );
}
export default DesktopVersion;

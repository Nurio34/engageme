import { LuDot } from "react-icons/lu";

function Skeleton() {
  return (
    <div
      className="md:grid lg:grid-cols-[1fr,319px] gap-x-16
            md:px-16 md:py-6 
        "
    >
      <div className="flex flex-col items-center">
        <div className="w-full border-b h-11 flex items-center gap-x-4">
          <div className="w-14 h-6 rounded-lg bg-base-content/50 animate-pulse" />
          <div className="w-20 h-6 rounded-lg bg-base-content/50 animate-pulse" />
        </div>
        {Array(3)
          .fill("#")
          .map((_, ind) => (
            <div key={ind} className="w-full md:w-[468px] py-4 border-b-2">
              <div className="flex justify-start items-center gap-3 px-2 md:px-0">
                <div className="w-11 aspect-square rounded-full bg-base-content/50 animate-pulse" />
                <div className="flex items-center ">
                  <div className="w-14 h-6 rounded-lg bg-base-content/50 animate-pulse" />
                  <LuDot />
                  <div className="w-4 h-5 rounded-md bg-base-content/50 animate-pulse" />
                </div>
                <div className="w-4 aspect-square rounded-md bg-base-content/50 animate-pulse ml-auto" />
              </div>{" "}
              <div className="w-full lg:max-w-[468px] aspect-square bg-base-content/50 animate-pulse mt-2 shadow-md md:rounded-lg" />
              <div className="px-2 md:px-0">
                <div className="h-12 flex justify-between items-center">
                  <div className="flex justify-start items-center gap-x-4">
                    <div className="w-6 aspect-square rounded-lg bg-base-content/50 animate-pulse" />
                    <div className="w-6 aspect-square rounded-lg bg-base-content/50 animate-pulse" />
                    <div className="w-6 aspect-square rounded-lg bg-base-content/50 animate-pulse" />
                  </div>
                  <div className="w-6 aspect-square rounded-lg bg-base-content/50 animate-pulse" />
                </div>
                <div className="text-sm font-semibold h-5 aspect-video rounded-lg bg-base-content/50 animate-pulse" />
                <div className="flex items-center gap-x-2 mt-2">
                  <div className="w-14 h-5 rounded-lg bg-base-content/50 animate-pulse" />
                  <div className="w-60 h-5 rounded-lg bg-base-content/50 animate-pulse" />
                </div>
                <div className="w-32 h-5 rounded-lg bg-base-content/50 animate-pulse mt-2 " />
                <div className="w-full h-5 mt-3 rounded-lg bg-base-content/50 animate-pulse" />
              </div>
              {/* <PostModal post={post} /> */}
            </div>
          ))}
      </div>
    </div>
  );
}
export default Skeleton;

import { LuDot } from "react-icons/lu";

function Skeleton() {
  return (
    <div
      className=" md:grid lg:grid-cols-[630px,383px] lg:justify-center
        md:px-16 md:py-[22px]
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
      <div className="pl-16 pt-9">
        <div className="flex gap-x-3 items-center justify-center px-4">
          <div className="relative w-11 aspect-square rounded-full overflow-hidden bg-base-content/50 animate-pulse" />
          <div className="grow grid gap-y-1">
            <p className="h-[18px] w-16 bg-base-content/50 animate-pulse rounded-md" />
            <p className="h-[18px] w-28 bg-base-content/50 animate-pulse rounded-md" />
          </div>
          <button
            type="button"
            className="w-[35.47px] h-4 bg-base-content/50 animate-pulse rounded-md"
          />
        </div>
        <div className="pt-6 pb-2">
          <div className="flex justify-between items-center px-4">
            <div className="w-[118.63px] h-4 bg-base-content/50 rounded-md animate-pulse" />
            <button
              type="button"
              className="w-[36.92px] h-4 rounded-md bg-base-content/50 animate-pulse"
            />
          </div>
          <div className="py-2">
            {Array(5)
              .fill("#")
              .map((_, ind) => (
                <div
                  key={ind}
                  className="flex gap-x-3 items-center justify-center px-4 py-2"
                >
                  <div className="relative w-11 aspect-square rounded-full overflow-hidden bg-base-content/50 animate-pulse" />
                  <div className="grow grid gap-y-1">
                    <p className="h-[18px] w-16 bg-base-content/50 animate-pulse rounded-md" />
                    <p className="h-[18px] w-28 bg-base-content/50 animate-pulse rounded-md" />
                  </div>
                  <button
                    type="button"
                    className="w-[35.47px] h-4 bg-base-content/50 animate-pulse rounded-md"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Skeleton;

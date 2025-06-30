import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import Image from "next/image";

function SuggestedForYouList({
  maxWidth,
  recomendations,
  path,
}: {
  maxWidth: number;
  recomendations: PrismaRecomendationType[];
  path?: "explore";
}) {
  return (
    <div className="w-full flex justify-center">
      <ul className="w-full" style={{ maxWidth }}>
        {recomendations.map((recomendation) => (
          <li
            key={recomendation.userId}
            className="py-2 px-4
            flex items-center justify-between gap-x-3
        "
          >
            <figure
              className="relative w-11 aspect-square border overflow-hidden rounded-full
            flex items-center justify-center 
            "
            >
              <Image
                src={recomendation.avatar}
                fill
                alt={`Avatar of ${recomendation.name}`}
                className="object-cover"
              />
            </figure>
            <div className="grow">
              <p className="text-sm font-semibold leading-[18px]">
                {recomendation.name}
              </p>
              <p className="text-sm font-normal leading-[18px] text-base-content/50">
                {recomendation.fullname}
              </p>
              {path === "explore" && (
                <p className="text-xs font-normal leading-4 text-base-content/50">
                  EngageMe Suggested
                </p>
              )}
            </div>
            <button type="button" className="btn btn-primary btn-sm">
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SuggestedForYouList;

"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";
import Name from "../_components/Name";

function Description({
  post,
  isTruncated,
  setIsTruncated,
  setIsContainerHovered,
}: {
  post: PrismaPostType;
  isTruncated: boolean;
  setIsTruncated: Dispatch<SetStateAction<boolean>>;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
}) {
  const { user, message } = post;
  const { name } = user;

  const isMessageLongThan100 = message.length > 100;

  useEffect(() => {
    if (isMessageLongThan100) setIsTruncated(true);
  }, [setIsTruncated, isMessageLongThan100]);

  return (
    <div className="grow mt-2 text-sm max-h-48 overflow-y-auto">
      <div className={`mr-2 ${message ? "float-left" : ""}`}>
        <Name name={name} setIsContainerHovered={setIsContainerHovered} />
      </div>
      <div className={`grow break-all ${isTruncated ? "flex" : ""}`}>
        <p
          className={`${isTruncated ? "truncate" : ""}`}
          style={{ width: isTruncated ? "200px" : "100%" }}
        >
          {message}
        </p>
        {isMessageLongThan100 && (
          <button
            type="button"
            className="text-base-content/50"
            onClick={() => {
              if (isTruncated) setIsTruncated(false);
              else setIsTruncated(true);
            }}
          >
            {isTruncated ? "more" : "less"}
          </button>
        )}
      </div>
    </div>
  );
}
export default Description;

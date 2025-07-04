"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import Name from "../Header/Name";

function Description({
  post,
  setIsContainerHovered,
}: {
  post: PrismaPostType;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
}) {
  const { user, message } = post;
  const { name } = user;

  const [isTruncated, setIsTruncated] = useState(false);

  const isMessageLongThan100 = message.length > 100;

  useEffect(() => {
    if (isMessageLongThan100) setIsTruncated(true);
  }, [isMessageLongThan100]);

  return (
    <div className="grow mt-2 text-sm">
      <div className={`mr-2 ${message ? "float-left" : ""}`}>
        <Name name={name} setIsContainerHovered={setIsContainerHovered} />
      </div>
      <div className={` grow ${isTruncated ? "flex" : ""}`}>
        <p
          className={`break-words ${isTruncated ? "truncate" : ""}`}
          style={{ width: isTruncated ? "200px" : "100%" }}
        >
          {message}
        </p>
        {isTruncated && (
          <button
            type="button"
            className="text-base-content/50"
            onClick={() => setIsTruncated(false)}
          >
            more
          </button>
        )}
      </div>
    </div>
  );
}
export default Description;

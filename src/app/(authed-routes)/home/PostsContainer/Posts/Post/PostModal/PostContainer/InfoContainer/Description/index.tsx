"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { PrismaPostType } from "../../../../../../../../../../../prisma/types/post";
import Name from "../../../../Header/Name";

function Description({
  post,
  isTruncated,
  setIsTruncated,
}: {
  post: PrismaPostType;
  isTruncated: boolean;
  setIsTruncated: Dispatch<SetStateAction<boolean>>;
}) {
  const { user, message } = post;
  const { name } = user;

  const isMessageLongThan100 = message.length > 100;

  useEffect(() => {
    if (isMessageLongThan100) setIsTruncated(true);
  }, [setIsTruncated, isMessageLongThan100]);

  return (
    <div
      className="grow mt-2 text-sm
      "
    >
      <div className={`mr-2 ${message ? "float-left" : ""}`}>
        <Name name={name} />
      </div>
      <div className={`grow ${isTruncated ? "flex" : ""}`}>
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

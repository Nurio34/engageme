"use client";

import { useEffect, useState } from "react";
import { PrismaPostType } from "../../../../../../../../prisma/types/post";

function Description({ post }: { post: PrismaPostType }) {
  const { user, message } = post;
  const { name } = user;

  const [isTruncated, setIsTruncated] = useState(false);

  const isMessageLongThan100 = message.length > 100;

  useEffect(() => {
    if (isMessageLongThan100) setIsTruncated(true);
  }, [isMessageLongThan100]);

  return (
    <div className="grow mt-2 text-sm">
      <p className={`font-semibold mr-2 ${message ? "float-left" : ""}`}>
        {name}
      </p>
      <div className={`${isTruncated ? "flex" : ""}`}>
        <p
          className={`${isTruncated ? "truncate" : ""}`}
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

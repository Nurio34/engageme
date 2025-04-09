"use client";

import { useFormStatus } from "react-dom";
import { FaRegHeart } from "react-icons/fa";

function Like() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="Like" disabled={pending} title="Like">
      <FaRegHeart
        size={24}
        className="transition-colors hover:text-base-content/50"
      />
    </button>
  );
}
export default Like;

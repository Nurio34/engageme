"use client";

import { useFormStatus } from "react-dom";
import { FaHeart } from "react-icons/fa";

function RemoveLike() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="RemoveLike"
      disabled={pending}
      title="Remove Like"
    >
      <FaHeart size={24} color="red" />
    </button>
  );
}
export default RemoveLike;

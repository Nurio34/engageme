"use client";

import { useFormStatus } from "react-dom";
import { FaRegHeart } from "react-icons/fa";

function Like() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="Like" disabled={pending}>
      <FaRegHeart size={24} />
    </button>
  );
}
export default Like;

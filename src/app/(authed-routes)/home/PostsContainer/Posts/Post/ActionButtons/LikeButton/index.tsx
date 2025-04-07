"use client";

import { useEffect, useState } from "react";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import { useUser } from "@clerk/nextjs";
import { likeThePost } from "@/app/actions/post/like/likeThePost";
import toast from "react-hot-toast";
import { removeLike } from "@/app/actions/post/like/removeLike";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./index.css";

function Client({ post }: { post: PrismaPostType }) {
  const { user } = useUser();
  const { likes } = post;

  const [isLiked, setIsLiked] = useState(false);

  const likeThePostAction = async () => {
    try {
      const { status } = await likeThePost(post.id);

      if (status === "fail")
        return toast.error(
          "Something went wrong while liking the post ! Please try again.."
        );

      setIsLiked(true);
    } catch (error) {
      console.log(error);
      toast.error(
        "Unexpected error while liking the post ! Please try again.."
      );
    }
  };
  const removeLikeAction = async () => {
    try {
      const { status } = await removeLike(post.id);

      if (status === "fail")
        return toast.error(
          "Something went wrong while removing like from the post ! Please try again.."
        );

      setIsLiked(false);
    } catch (error) {
      console.log(error);
      return toast.error(
        "Unexpected error while removing like from the post ! Please try again.."
      );
    }
  };

  const likeAction = () => (isLiked ? removeLikeAction() : likeThePostAction());

  useEffect(() => {
    const userId = user?.id;

    if (!userId) return;

    const isLiked = likes.some((likeObj) => likeObj.userId === userId);
    setIsLiked(isLiked);
  }, [user]);

  return (
    <button type="button" onClick={likeAction}>
      {isLiked ? (
        <FaHeart size={24} color="red" className="AnimateLike" />
      ) : (
        <FaRegHeart
          size={24}
          onMouseEnter={(e) => e.currentTarget.classList.remove("AnimateLike")}
          onMouseLeave={(e) => e.currentTarget.classList.add("AnimateLike")}
        />
      )}
    </button>
  );
}
export default Client;

"use client";

import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  PrismaPostCommentType,
  PrismaPostType,
} from "../../../../../../prisma/types/post";
import { useUser } from "@clerk/nextjs";
import { usePostLike } from "./_hooks/usePostLike";
import { usePostComment } from "./_hooks/usePostComment";

interface PostsContextType {
  postsState: PrismaPostType[];
  setPostsState: React.Dispatch<React.SetStateAction<PrismaPostType[]>>;
  isPostLiked: (postId: string) => boolean;
  likeThePostAction: (postId: string) => Promise<string | undefined>;
  removeLikeFromThePostAction: (postId: string) => Promise<string | undefined>;
  isLoading_LikePost: boolean;
  addComment: (postId: string, postComment: PrismaPostCommentType) => void;
  isCommentLiked: (postId: string, commentId: string) => boolean;
  likeCommentAction: (
    postId: string,
    commentId: string
  ) => Promise<string | undefined>;
  removeLikeFromTheCommentAction: (
    postId: string,
    commentId: string
  ) => Promise<string | undefined>;
  isLoading_LikeComment: boolean;
}

const Context = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({
  children,
  posts,
}: {
  children: ReactNode;
  posts: PrismaPostType[];
}) => {
  const { user } = useUser();
  const userId = user?.id;

  const [postsState, setPostsState] = useState<PrismaPostType[]>([]);

  useEffect(() => {
    setPostsState(posts);
  }, [posts]);

  const {
    isPostLiked,
    likeThePostAction,
    removeLikeFromThePostAction,
    isLoading_LikePost,
  } = usePostLike(postsState, setPostsState, userId);

  //! *** comments ***

  const {
    addComment,
    isCommentLiked,
    likeCommentAction,
    removeLikeFromTheCommentAction,
    isLoading_LikeComment,
  } = usePostComment(setPostsState, postsState, userId);

  //! *****************

  return (
    <Context.Provider
      value={{
        postsState,
        setPostsState,
        likeThePostAction,
        removeLikeFromThePostAction,
        isLoading_LikePost,
        isPostLiked,
        addComment,
        isCommentLiked,
        likeCommentAction,
        removeLikeFromTheCommentAction,
        isLoading_LikeComment,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePostsContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("usePostsContext must be used within a Provider");
  return context;
};

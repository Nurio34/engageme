"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { PointerType, useDragAndFade } from "./_hooks/useDragAndFade";
import { useReply } from "./_hooks/useReply";
import { PrismaPostType } from "../../../../../../../../../../prisma/types/post";
import { useAppSelector } from "@/store/hooks";
import { CommentReplyType } from "../../../../Context";
import { usePostComment } from "./_hooks/usePostComment";
import { PostCommentLike, ReplyCommentLike } from "@prisma/client";

interface ContextType {
  isDragging: boolean;
  isFading: boolean;
  x: number;
  y: number;
  setPointer: Dispatch<SetStateAction<PointerType>>;
  setCommentReply: Dispatch<SetStateAction<CommentReplyType>>;
  CommentAreaRef: RefObject<HTMLTextAreaElement | null>;
  isCommentLiked: (postId: string, commentId: string) => boolean;
  likeCommentAction: (
    postId: string,
    commentId: string,
    commentOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  removeLikeFromTheCommentAction: (
    postId: string,
    commentLike: PostCommentLike,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  repliedCommentId: string;
  isReplyLiked: (
    postId: string,
    commentId: string,
    replyId: string
  ) => boolean | undefined;
  likeTheReplyAction: (
    postId: string,
    commentId: string,
    replyId: string,
    replyOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  removeLikeFromReplyAction: (
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    postId: string,
    commentId: string,
    replyId: string,
    like: ReplyCommentLike
  ) => Promise<string | undefined>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { id: userId } = useAppSelector((s) => s.user);

  const { isDragging, isFading, x, y, setPointer } = useDragAndFade();

  const [postsState, setPostsState] = useState<PrismaPostType[]>([]);

  const {
    addComment,
    isCommentLiked,
    likeCommentAction,
    removeLikeFromTheCommentAction,
  } = usePostComment(setPostsState, postsState, userId);

  const {
    setCommentReply,
    setRepliedCommentId,
    CommentAreaRef,
    commentReply,
    repliedCommentId,
    addReply,
    isReplyLiked,
    likeTheReplyAction,
    removeLikeFromReplyAction,
  } = useReply(setPostsState, userId, postsState);

  return (
    <Context.Provider
      value={{
        isDragging,
        isFading,
        x,
        y,
        setPointer,
        setCommentReply,
        CommentAreaRef,
        isCommentLiked,
        likeCommentAction,
        removeLikeFromTheCommentAction,
        repliedCommentId,
        isReplyLiked,
        likeTheReplyAction,
        removeLikeFromReplyAction,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useInfoContainerContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useInfoContainerContext must be used within a Provider");
  return context;
};

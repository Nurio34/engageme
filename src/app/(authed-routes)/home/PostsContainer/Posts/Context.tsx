"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  PrismaPostCommentType,
  PrismaPostType,
  PrismaReplyCommentType,
} from "../../../../../../prisma/types/post";
import { usePostLike } from "./_hooks/usePostLike";
import { usePostComment } from "./_hooks/usePostComment";
import { useAppSelector } from "@/store/hooks";
import { PostCommentLike, PostLike, ReplyCommentLike } from "@prisma/client";
import { PointerType, useDragAndFade } from "./_hooks/useDragAndFade";
import { useReply } from "./_hooks/useReply";

export type CommentReplyType = {
  isReply: boolean;
  replyToId: string;
  replyToName: string;
  isReplyToReply: boolean;
  count: number;
};

interface PostsContextType {
  postsState: PrismaPostType[];
  setPostsState: Dispatch<SetStateAction<PrismaPostType[]>>;
  isDragging: boolean;
  isFading: boolean;
  x: number;
  y: number;
  setPointer: Dispatch<SetStateAction<PointerType>>;
  isPostLiked: (postId: string) => boolean;
  likeThePostAction: (
    postId: string,
    postOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  removeLikeFromThePostAction: (
    like: PostLike,
    postOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  addComment: (postId: string, postComment: PrismaPostCommentType) => void;
  isCommentLiked: (postId: string, commentId: string) => boolean;
  likeCommentAction: (
    postId: string,
    commentId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  removeLikeFromTheCommentAction: (
    postId: string,
    commentLike: PostCommentLike,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  CommentAreaRef: RefObject<HTMLTextAreaElement | null>;
  commentReply: CommentReplyType;
  setCommentReply: Dispatch<SetStateAction<CommentReplyType>>;
  repliedCommentId: string;
  setRepliedCommentId: Dispatch<SetStateAction<string>>;
  addReply: (postId: string, replyComment: PrismaReplyCommentType) => void;
  isReplyLiked: (
    postId: string,
    commentId: string,
    replyId: string
  ) => boolean | undefined;
  likeTheReplyAction: (
    postId: string,
    commentId: string,
    replyId: string,
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

const Context = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({
  children,
  posts,
}: {
  children: ReactNode;
  posts: PrismaPostType[];
}) => {
  const { id: userId } = useAppSelector((s) => s.user);
  const { postModal } = useAppSelector((s) => s.homePage);

  const [postsState, setPostsState] = useState<PrismaPostType[]>([]);

  useEffect(() => {
    setPostsState(posts);
  }, [posts]);

  const { isDragging, isFading, x, y, setPointer } = useDragAndFade();

  const { isPostLiked, likeThePostAction, removeLikeFromThePostAction } =
    usePostLike(postsState, setPostsState, userId);

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

  //! *** reset when postModal closed ***
  useEffect(() => {
    if (!postModal.isOpen) {
      setCommentReply({
        isReply: false,
        replyToId: "",
        replyToName: "",
        isReplyToReply: false,
        count: 0,
      });
      setRepliedCommentId("");
    }
  }, [postModal.isOpen]);
  //! ***********************************

  return (
    <Context.Provider
      value={{
        postsState,
        setPostsState,
        isDragging,
        isFading,
        x,
        y,
        setPointer,
        likeThePostAction,
        removeLikeFromThePostAction,
        isPostLiked,
        addComment,
        isCommentLiked,
        likeCommentAction,
        removeLikeFromTheCommentAction,
        CommentAreaRef,
        commentReply,
        setCommentReply,
        repliedCommentId,
        setRepliedCommentId,
        addReply,
        isReplyLiked,
        likeTheReplyAction,
        removeLikeFromReplyAction,
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

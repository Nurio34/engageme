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
import { usePostLike } from "./_hooks/usePostLike";
import { usePostComment } from "./_hooks/usePostComment";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { PointerType, useDragAndFade } from "./_hooks/useDragAndFade";
import { useReply } from "./_hooks/useReply";
import { setPostModal } from "@/store/slices/homePage";
import {
  PrismaCommentLikeType,
  PrismaPostCommentType,
  PrismaPostLikeType,
  PrismaPostType,
  PrismaReplyCommentType,
  PrismaReplyLikeType,
} from "../../../../../../../../../../prisma/types/post";

export type CommentReplyType = {
  isReply: boolean;
  commentId: string;
  replyToName: string;
  isReplyToReply: boolean;
  count: number;
  replyId: string;
  commentOwnerId: string;
};

interface InfoContextType {
  postsState: PrismaPostType[];
  setPostsState: Dispatch<SetStateAction<PrismaPostType[]>>;
  skip: number;
  setSkip: Dispatch<SetStateAction<number>>;
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
    like: PrismaPostLikeType,
    postOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  addComment: (postId: string, postComment: PrismaPostCommentType) => void;

  isCommentLiked: (postId: string, commentId: string) => boolean;
  likeCommentAction: (
    postId: string,
    commentId: string,
    commentOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  removeLikeFromTheCommentAction: (
    postId: string,
    commentLike: PrismaCommentLikeType,
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
    replyOwnerId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | undefined>;
  removeLikeFromReplyAction: (
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    postId: string,
    commentId: string,
    replyId: string,
    like: PrismaReplyLikeType
  ) => Promise<string | undefined>;
  page: string;
}

const Context = createContext<InfoContextType | undefined>(undefined);

export const InfoContainerContextProvider = ({
  children,
  post,
  page,
}: {
  children: ReactNode;
  post: PrismaPostType;
  page: string;
}) => {
  const { id: userId } = useAppSelector((s) => s.user);

  const { postModal } = useAppSelector((s) => s.homePage);
  const isPostModalOpen = postModal.isOpen;

  const dispatch = useAppDispatch();

  const [postsState, setPostsState] = useState<PrismaPostType[]>([]);
  const [skip, setSkip] = useState(1);

  useEffect(() => {
    setPostsState((prev) => [...prev, post]);
  }, [post]);

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

  //! *** push history state when "isPostModalOpen === true" ( for mobile native back button manipulation ) ***
  useEffect(() => {
    if (isPostModalOpen)
      history.pushState({ isPostModalOpen: true }, "", window.location.href);

    const handlePopState = () =>
      dispatch(setPostModal({ isOpen: false, postId: "" }));

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [isPostModalOpen]);

  //! ***********************************************************************************************************

  //! *** reset when postModal closed ***
  useEffect(() => {
    if (!isPostModalOpen) {
      setCommentReply({
        isReply: false,
        commentId: "",
        replyToName: "",
        isReplyToReply: false,
        count: 0,
        replyId: "",
        commentOwnerId: "",
      });
      setRepliedCommentId("");
    }
  }, [isPostModalOpen]);
  //! ***********************************

  return (
    <Context.Provider
      value={{
        postsState,
        setPostsState,
        skip,
        setSkip,
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
        page,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useInfoContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("usePostsContext must be used within a Provider");
  return context;
};

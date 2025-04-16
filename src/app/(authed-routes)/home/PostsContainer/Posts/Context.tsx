"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
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
import { PostCommentLike, PostLike } from "@prisma/client";
import { PointerType, useDragAndFade } from "./_hooks/useDragAndFade";

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
  likeThePostAction: (postId: string) => Promise<string | undefined>;
  removeLikeFromThePostAction: (like: PostLike) => Promise<string | undefined>;
  isLoading_LikePost: boolean;
  addComment: (postId: string, postComment: PrismaPostCommentType) => void;
  isCommentLiked: (postId: string, commentId: string) => boolean;
  likeCommentAction: (
    postId: string,
    commentId: string
  ) => Promise<string | undefined>;
  removeLikeFromTheCommentAction: (
    postId: string,
    commentLike: PostCommentLike
  ) => Promise<string | undefined>;
  isLoading_LikeComment: boolean;
  CommentAreaRef: RefObject<HTMLTextAreaElement | null>;
  commentReply: CommentReplyType;
  setCommentReply: Dispatch<SetStateAction<CommentReplyType>>;
  repliedCommentId: string;
  setRepliedCommentId: Dispatch<SetStateAction<string>>;
  addReply: (postId: string, replyComment: PrismaReplyCommentType) => void;
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

  const {
    isPostLiked,
    likeThePostAction,
    removeLikeFromThePostAction,
    isLoading_LikePost,
  } = usePostLike(postsState, setPostsState, userId);

  const {
    addComment,
    isCommentLiked,
    likeCommentAction,
    removeLikeFromTheCommentAction,
    isLoading_LikeComment,
  } = usePostComment(setPostsState, postsState, userId);

  //! *** commentReply state ***
  const CommentAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentReply, setCommentReply] = useState<CommentReplyType>({
    isReply: false,
    replyToId: "",
    replyToName: "",
    isReplyToReply: false,
    count: 0,
  });
  //! **************************

  //! *** reply functions ***
  const [repliedCommentId, setRepliedCommentId] = useState("");
  const addReply = (postId: string, replyComment: PrismaReplyCommentType) =>
    setPostsState((prev) =>
      prev.map((postObj) =>
        postObj.id === postId
          ? {
              ...postObj,
              comments: postObj.comments.map((commentObj) =>
                commentObj.id === replyComment.commentId
                  ? {
                      ...commentObj,
                      replies: [...commentObj.replies, replyComment],
                    }
                  : commentObj
              ),
            }
          : postObj
      )
    );
  //! ***********************

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
        isLoading_LikePost,
        isPostLiked,
        addComment,
        isCommentLiked,
        likeCommentAction,
        removeLikeFromTheCommentAction,
        isLoading_LikeComment,
        CommentAreaRef,
        commentReply,
        setCommentReply,
        repliedCommentId,
        setRepliedCommentId,
        addReply,
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

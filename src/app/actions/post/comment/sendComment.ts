"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import {
  PrismaPostCommentType,
  PrismaReplyCommentType,
} from "../../../../../prisma/types/post";

export const sendComment = async (
  prevState: {
    status: string;
    postComment?: PrismaPostCommentType;
    replyComment?: PrismaReplyCommentType;
    isReply: boolean;
  },
  formData: FormData
): Promise<{
  status: "success" | "fail" | "pending";
  message: string;
  postComment?: PrismaPostCommentType;
  replyComment?: PrismaReplyCommentType;
  isReply: boolean;
}> => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: "fail",
        message: "You have to sign in to comment to posts!",
        postComment: {} as PrismaPostCommentType,
        isReply: false,
      };

    const userId = user.id;
    const postId = formData.get("postId") as string;
    const comment = formData.get("comment") as string;
    const isReply = formData.get("isReply") as string;
    const isReplyState = isReply === "1";
    const commentId = formData.get("commentId") as string;
    const isReplyToReply = formData.get("isReplyToReply") as string;
    const isReplyToReplyState = isReplyToReply === "1";
    const replyId = formData.get("replyId") as string;
    const replyToName = formData.get("replyToName") as string;

    if (!isReplyState) {
      const postComment = await prisma.postComment.create({
        data: {
          userId,
          postId,
          comment,
        },
        include: {
          user: {
            include: {
              _count: {
                select: {
                  posts: true,
                  following: true,
                  followers: true,
                },
              },
              posts: {
                include: {
                  medias: {
                    take: 1,
                  },
                },
                orderBy: {
                  createdAt: "desc",
                },
                take: 3,
              },
              followers: userId
                ? {
                    where: {
                      followerId: userId,
                    },
                    select: {
                      followerId: true,
                    },
                    take: 1,
                  }
                : false,
            },
          },
          likes: { include: { user: true } },
          replies: {
            include: {
              user: {
                include: {
                  _count: {
                    select: {
                      posts: true,
                      following: true,
                      followers: true,
                    },
                  },
                  posts: {
                    include: {
                      medias: {
                        take: 1,
                      },
                    },
                    orderBy: {
                      createdAt: "desc",
                    },
                    take: 3,
                  },
                  followers: userId
                    ? {
                        where: {
                          followerId: userId,
                        },
                        select: {
                          followerId: true,
                        },
                        take: 1,
                      }
                    : false,
                },
              },
              likes: { include: { user: true } },
            },
          },
        },
      });

      if (!postComment)
        return {
          status: "fail",
          message:
            "Something went wrong while commenting ! Please try again...",
          postComment: {} as PrismaPostCommentType,
          isReply: isReplyState,
        };

      return {
        status: "success",
        message: "Success",
        postComment,
        isReply: isReplyState,
      };
    } else {
      if (!isReplyToReplyState) {
        const replyComment = await prisma.replyComment.create({
          data: {
            commentId,
            userId,
            comment,
          },
          include: {
            user: {
              include: {
                _count: {
                  select: {
                    posts: true,
                    following: true,
                    followers: true,
                  },
                },
                posts: {
                  include: {
                    medias: {
                      take: 1,
                    },
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: 3,
                },
                followers: userId
                  ? {
                      where: {
                        followerId: userId,
                      },
                      select: {
                        followerId: true,
                      },
                      take: 1,
                    }
                  : false,
              },
            },
            likes: { include: { user: true } },
          },
        });

        if (!replyComment)
          return {
            status: "fail",
            message:
              "Something went wrong while commenting ! Please try again...",
            replyComment: {} as PrismaReplyCommentType,
            isReply: isReplyState,
          };

        return {
          status: "success",
          message: "Success",
          replyComment,
          isReply: isReplyState,
        };
      } else {
        const replyComment = await prisma.replyComment.create({
          data: {
            commentId,
            userId,
            comment,
            replyToName,
            replyId,
          },
          include: {
            user: {
              include: {
                _count: {
                  select: {
                    posts: true,
                    following: true,
                    followers: true,
                  },
                },
                posts: {
                  include: {
                    medias: {
                      take: 1,
                    },
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: 3,
                },
                followers: userId
                  ? {
                      where: {
                        followerId: userId,
                      },
                      select: {
                        followerId: true,
                      },
                      take: 1,
                    }
                  : false,
              },
            },
            likes: { include: { user: true } },
          },
        });

        if (!replyComment)
          return {
            status: "fail",
            message:
              "Something went wrong while commenting ! Please try again...",
            replyComment: {} as PrismaReplyCommentType,
            isReply: isReplyState,
          };

        return {
          status: "success",
          message: "Success",
          replyComment,
          isReply: isReplyState,
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "Something went wrong while commenting ! Please try again...",
      postComment: {} as PrismaPostCommentType,
      replyComment: {} as PrismaReplyCommentType,
      isReply: false,
    };
  }
};

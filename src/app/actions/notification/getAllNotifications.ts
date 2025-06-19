"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { AllNotificationsType } from "../../../../prisma/types/notification";

export const getAllNotifications = async (): Promise<{
  status: "success" | "fail";
  allNotifications?: AllNotificationsType;
}> => {
  try {
    const user = await currentUser();
    // if (!user) return { status: "fail" };
    if (!user) return { status: "success" };

    const allNotifications = await prisma.user.findUnique({
      where: { userId: user?.id },
      select: {
        postLikeNotifications: {
          include: {
            postLike: {
              include: {
                user: true,
                post: {
                  include: {
                    medias: true,
                  },
                },
              },
            },
          },
        },
        postCommentNotifications: {
          include: {
            comment: {
              include: {
                user: true,
                post: {
                  include: {
                    medias: true,
                  },
                },
              },
            },
          },
        },
        postCommentLikeNotifications: {
          include: {
            commentLike: {
              include: {
                user: true,
                comment: {
                  include: {
                    post: {
                      include: {
                        medias: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        replyCommentNotifications: {
          include: {
            comment: {
              include: {
                user: true,
                postComment: {
                  include: {
                    post: {
                      include: {
                        medias: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        replyCommentLikeNotifications: {
          include: {
            commentLike: {
              include: {
                user: true,
                comment: {
                  include: {
                    postComment: {
                      include: {
                        post: {
                          include: {
                            medias: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!allNotifications) return { status: "fail" };

    return { status: "success", allNotifications };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};

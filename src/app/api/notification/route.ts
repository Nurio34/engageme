import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  console.log("getNotifications()...");

  const requestSecret = req.headers.get("request-secret");
  const userId = req.headers.get("user-id");

  if (!requestSecret || requestSecret !== process.env.REQUEST_SECRET) {
    return NextResponse.json({ status: "fail" }, { status: 401 });
  }

  try {
    if (userId === "null" || !userId)
      return NextResponse.json({ status: "success" }, { status: 200 });

    const allNotifications = await prisma.user.findUnique({
      where: { userId },
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
        followNotifications: {
          include: {
            user: {
              include: {
                following: {
                  select: {
                    followingId: true,
                  },
                },
              },
            },
            follow: {
              include: {
                follower: {
                  select: {
                    userId: true,
                    name: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!allNotifications)
      return NextResponse.json({ status: "fail" }, { status: 404 });

    return NextResponse.json(
      { status: "success", msg: "Success!", allNotifications },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "fail" }, { status: 500 });
  }
}

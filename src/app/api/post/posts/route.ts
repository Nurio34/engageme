import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("getPosts()...");

  if (req.headers.get("request-secret") !== process.env.REQUEST_SECRET!) {
    return NextResponse.json({ status: "fail" }, { status: 401 });
  }

  const skip = parseInt(req.nextUrl.searchParams.get("skip")!);

  try {
    const posts = await prisma.post.findMany({
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
            followers: {
              select: {
                followerId: true,
              },
            },
            favoritesReceived: {
              select: {
                userId: true,
              },
            },
          },
        },
        medias: {
          include: {
            poster: true,
            transformation: true,
          },
        },
        location: true,
        settings: true,
        likes: {
          include: {
            user: true,
          },
        },
        comments: {
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
                followers: {
                  select: {
                    followerId: true,
                  },
                },
              },
            },
            likes: {
              include: {
                user: true,
              },
            },
            replies: {
              include: {
                likes: {
                  include: {
                    user: true,
                  },
                },
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
                    followers: {
                      select: {
                        followerId: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                createdAt: "asc",
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip: skip * 5,
      take: 5,
    });
    // else if (variant === "followings") {
    //   const followings = (
    //     await prisma.follow.findMany({
    //       where: { followerId: userId! },
    //       select: {
    //         followingId: true,
    //       },
    //     })
    //   ).map((following) => following.followingId);

    //   posts = await prisma.post.findMany({
    //     where: {
    //       userId: {
    //         in: followings,
    //       },
    //     },
    //     include: {
    //       user: {
    //         include: {
    //           _count: {
    //             select: {
    //               posts: true,
    //             },
    //           },
    //         },
    //       },
    //       medias: {
    //         include: {
    //           poster: true,
    //           transformation: true,
    //         },
    //       },
    //       location: true,
    //       settings: true,
    //       likes: {
    //         include: {
    //           user: true,
    //         },
    //       },
    //       comments: {
    //         include: {
    //           user: true,
    //           likes: {
    //             include: {
    //               user: true,
    //             },
    //           },
    //           replies: {
    //             include: {
    //               likes: {
    //                 include: {
    //                   user: true,
    //                 },
    //               },
    //               user: true,
    //             },
    //             orderBy: {
    //               createdAt: "asc",
    //             },
    //           },
    //         },
    //         orderBy: {
    //           createdAt: "asc",
    //         },
    //       },
    //     },
    //     orderBy: {
    //       updatedAt: "desc",
    //     },
    //     skip: skip * 5,
    //     take: 5,
    //   });
    // }

    return NextResponse.json({ status: "success", posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "fail" }, { status: 500 });
  }
}

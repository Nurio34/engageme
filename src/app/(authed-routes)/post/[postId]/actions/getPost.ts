"use server";

import { prisma } from "@/lib/prisma";
import { PrismaPostType } from "../../../../../../prisma/types/post";

export const getPost = async (
  postId: string
): Promise<{ status: "success" | "fail"; post: null | PrismaPostType }> => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
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
    });

    if (!post) return { status: "fail", post: null };

    return { status: "success", post };
  } catch (error) {
    console.log(error);

    return { status: "fail", post: null };
  }
};

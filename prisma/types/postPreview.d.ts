import { Post, Media, Poster, Transformation } from "@prisma/client";

export type PostPreviewType = Post & {
  medias: Array<{
    altText: string | null;
    width: number | null;
    height: number | null;
    poster: Poster | null;
    type: "image" | "video";
    url: string;
    transformation: Transformation | null;
  }>;
  _count: {
    medias: number;
    comments: number;
    likes: number;
  };
};

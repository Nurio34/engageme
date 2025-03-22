"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type EagerType = {
  status: string;
  batch_id: string;
  url: string;
  secure_url: string;
};

export type PosterType = {
  url: string;
  publicId: string;
};

export type MediaType = {
  asset_id: string;
  public_id: string;
  version_id: string;
  url: string;
  secure_url: string;
  format: string;
  resource_type: string;
  width: number;
  height: number;
  duration?: number;
  eager?: EagerType[];
  audio?: Record<string, string | number>;
  poster?: PosterType;
  posterState?: PosterType;
  blob?: Blob;
  transformations?: Record<string, string>;
  isAudioAllowed?: boolean;
};

export type ResponseType = {
  status: "success" | "error";
  medias: MediaType[];
};

export type DeleteMediaType = {
  publicId: string;
  type: "image" | "video";
};

export const uploadFileToCloudinary = async (file: File) => {
  try {
    const getBuffer = async (file: File): Promise<Buffer> => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer;
    };

    const buffer = await getBuffer(file);

    const response = await cloudinary.uploader
      .upload_stream({
        resource_type: "image",
      })
      .end(buffer);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFilesFromCloudinary = async (
  publicIds: {
    publicId: string;
    type: "image" | "video";
  }[]
) => {
  const deleteFile = async (
    publicId: string,
    type: "image" | "video" | "raw"
  ) => {
    try {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: type,
      });
      return "success";
    } catch (error) {
      console.log(error);
      return "error";
    }
  };

  try {
    const deleteResults = await Promise.all(
      publicIds.map(({ publicId, type }) => deleteFile(publicId, type))
    );

    return deleteResults.some((result) => result === "error")
      ? "error"
      : "success";
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};

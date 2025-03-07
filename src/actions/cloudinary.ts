"use server";

import { FileObjectType } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

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
  audio?: Record<string, any>;
};

export type ResponseType = {
  status: "success" | "error";
  medias: MediaType[];
};

export type DeleteMediaType = {
  publicId: string;
  type: "image" | "video";
};

export const uploadFilesToCloudinary = async (
  files: FileObjectType[]
): Promise<ResponseType> => {
  try {
    const getBuffer = async (file: File): Promise<Buffer> => {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    };

    const uploadFile = async (
      file: FileObjectType
    ): Promise<UploadApiResponse> => {
      const buffer = await getBuffer(file.File);

      const fileType = file.File.type.split("/")[0];
      const paramX = file.cloudinarySize.w / file.size.w;
      const paramY = file.cloudinarySize.h / file.size.h;

      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: fileType === "image" ? "image" : "video",
              folder: "/Engage-Me",
              eager: [
                {
                  width: (file.cloudinarySize.w / file.scale).toFixed(),
                  height:
                    file.cloudinarySize.h <= file.originalSize.h
                      ? (file.cloudinarySize.h / file.scale).toFixed()
                      : undefined,
                  crop:
                    file.cloudinarySize.h <= file.originalSize.h
                      ? "crop"
                      : "scale",
                  aspect_ratio:
                    file.cloudinarySize.h <= file.originalSize.h
                      ? undefined
                      : +file.ratio.toFixed(2),
                  gravity: file.scale > 1 ? "center" : undefined,
                  x:
                    file.scale === 1
                      ? (file.position.x * -1 * paramX).toFixed()
                      : undefined,
                  y:
                    file.scale === 1
                      ? (file.position.y * -1 * paramY).toFixed()
                      : undefined,
                },
              ],
              eager_async: true, // Process asynchronously
            },
            (error, result) => {
              if (error) reject(error);
              else if (!result) reject(new Error("No result from Cloudinary"));
              else resolve(result);
            }
          )
          .end(buffer);
      });
    };

    const uploadPromises = files.map((file) => uploadFile(file));
    const results = await Promise.all(uploadPromises);
    const medias = results.map((result) => ({
      asset_id: result.asset_id,
      public_id: result.public_id,
      version_id: result.version_id,
      url: result.url,
      secure_url: result.secure_url,
      format: result.format,
      resource_type: result.resource_type,
      width: result.width,
      height: result.height,
      duration: result.duration,
      eager: result.eager,
      audio: result.audio,
    }));
    return { status: "success", medias };
  } catch (_) {
    return { status: "error", medias: [] };
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
    } catch (_) {
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
  } catch (_) {
    return { status: "error" };
  }
};

"use server";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type FileWithPosition = { File: File; position: { x: number; y: number } };
type FileType = File | FileWithPosition;

type EagerType = {
  status: string;
  batch_id: string;
  url: string;
  secure_url: string;
};

type ResponseType = {
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

export const uploadFilesToCloudinary = async (
  files: FileType[]
): Promise<ResponseType[]> => {
  try {
    const getBuffer = async (file: File): Promise<Buffer> => {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    };

    const uploadFile = async (file: FileType): Promise<UploadApiResponse> => {
      if (file instanceof File) {
        const buffer = await getBuffer(file);
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { resource_type: "image", folder: "/Engage-Me" },
              (error, result) => {
                if (error) reject(error);
                else if (!result)
                  reject(new Error("No result from Cloudinary"));
                else resolve(result);
              }
            )
            .end(buffer);
        });
      } else {
        const buffer = await getBuffer(file.File);
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "video",
                folder: "/Engage-Me",
                eager: [
                  {
                    width: 680,
                    height: 750,
                    crop: "crop",
                    x: +file.position.x.toFixed() * -1,
                    y: +file.position.y.toFixed() * -1,
                  },
                ],
                eager_async: true,
              },
              (error, result) => {
                if (error) reject(error);
                else if (!result)
                  reject(new Error("No result from Cloudinary"));
                else resolve(result);
              }
            )
            .end(buffer);
        });
      }
    };

    const uploadPromises = files.map((file) => uploadFile(file));
    const results = await Promise.all(uploadPromises);
    return results.map((result) => ({
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
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

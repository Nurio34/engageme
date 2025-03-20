import { PosterType } from "@/actions/cloudinary";

export const deletePosterImageFromCloudinary = async (
  poster: PosterType,
  retries = 3
) => {
  if (retries <= 0) {
    console.error("Max retry attempts reached. Failed to delete poster.");
    return;
  }

  const { publicId } = poster;

  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  try {
    const response = await fetch(`${url}/deletePosterImage/${publicId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error();
    }

    const { status } = await response.json();
    if (status === "error") {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    setTimeout(
      () => deletePosterImageFromCloudinary(poster, retries - 1),
      2000
    );
  }
};

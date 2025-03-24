import { PosterType } from "@/actions/cloudinary";

export const uploadPosterImageCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  try {
    const response = await fetch(`${url}/uploadPosterImage`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return { status: "error" };
    }

    const data = await response.json();

    if (data.status === "error") {
      return { status: "error" };
    }

    const poster: PosterType = data.media;
    return { status: "success", poster };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};

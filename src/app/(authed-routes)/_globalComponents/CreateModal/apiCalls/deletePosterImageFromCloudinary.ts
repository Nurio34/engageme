export const deletePosterImageFromCloudinary = async (
  poster: string,
  retries = 3
) => {
  if (retries <= 0) {
    return;
  }

  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  try {
    const response = await fetch(`${url}/deletePosterImage/${poster}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete poster: ${poster}`);
    }

    const { status } = await response.json();
    if (status === "error") {
      throw new Error(`Server error while deleting poster: ${poster}`);
    }
  } catch (error) {
    console.error(error);
    setTimeout(
      () => deletePosterImageFromCloudinary(poster, retries - 1),
      2000
    );
  }
};

export const deletePosterImagesFromCloudinary = async (
  posters: string[],
  retries = 3
) => {
  if (retries <= 0) {
    return;
  }

  try {
    await Promise.all(
      posters.map((poster) => deletePosterImageFromCloudinary(poster))
    );
  } catch (error) {
    console.error(error);
    setTimeout(
      () => deletePosterImagesFromCloudinary(posters, retries - 1),
      2000
    );
  }
};

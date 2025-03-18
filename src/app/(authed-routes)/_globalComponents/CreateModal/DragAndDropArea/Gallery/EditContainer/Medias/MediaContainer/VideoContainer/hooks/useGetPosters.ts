import { useEffect, useState } from "react";

export const useGetPosters = (
  duration: number | undefined,
  eagerUrl: string
) => {
  const [posters, setPosters] = useState<string[]>([]);
  const [posterUrls, setPosterUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!duration || !eagerUrl) return;

    const totalPosters = 5;
    const timeParam = Math.floor(duration / totalPosters);

    const newPosters: string[] = [];
    for (let i = 0; i < totalPosters; i++) {
      const time = i * timeParam;
      const imageUrl = eagerUrl
        .replace("/video/upload/", `/video/upload/so_${time}/`)
        .replace("mp4", "jpg");

      newPosters.push(imageUrl);
    }

    setPosters(newPosters);
  }, [duration, eagerUrl]);

  useEffect(() => {
    if (posters.length === 0) return;

    const fetchImage = async (posterUrl: string) => {
      const response = await fetch(posterUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPosterUrls((prev) => [...prev, url]);
    };

    posters.forEach((poster) => fetchImage(poster));
  }, [posters]);

  return posters;
};

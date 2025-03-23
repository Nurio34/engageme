import { useEffect, useState } from "react";

export const useGetPosters = (
  duration: number | undefined,
  eagerUrl: string
) => {
  const [posters, setPosters] = useState<string[]>([]);

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

  return posters;
};

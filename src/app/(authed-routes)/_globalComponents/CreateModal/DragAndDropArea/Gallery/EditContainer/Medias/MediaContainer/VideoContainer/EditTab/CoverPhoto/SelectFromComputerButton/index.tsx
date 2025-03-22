import { MediaType, PosterType } from "@/actions/cloudinary";
import { deletePosterImageFromCloudinary } from "@/app/(authed-routes)/_globalComponents/CreateModal/apiCalls/deletePosterImageFromCloudinary";
import { uploadPosterImageCloudinary } from "@/app/(authed-routes)/_globalComponents/CreateModal/apiCalls/uploadPosterImageCloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import Loading from "@/app/_globalComponents/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPosterImage, removePosterImage } from "@/store/slices/modals";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

function SelectFromComputerButton({ media }: { media: MediaType }) {
  const { asset_id, posterState } = media;

  const { posterImages } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();
  const { setCloudinaryMedias } = useCreateModalContext();
  const [file, setFile] = useState<File | null>(null);
  const [poster, setPoster] = useState<PosterType | undefined>(posterState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList || !fileList.length) return;

    const file = fileList[0];
    setFile(file);
  };

  useEffect(() => {
    if (!file) return;

    if (poster) {
      const isAnyIn = posterImages.find((id) => id === poster?.publicId);
      if (isAnyIn) {
        dispatch(removePosterImage(poster.publicId));
      }

      deletePosterImageFromCloudinary(poster.publicId);
    }

    uploadPosterImageCloudinary(file, setPoster, setIsLoading);
  }, [file]);

  const updateCloudinaryPoster = () => {
    if (!poster) return;

    setCloudinaryMedias((prev) => {
      const updatedMedias = prev.medias.map((mediaObj) => {
        if (mediaObj.asset_id === asset_id) {
          return {
            ...mediaObj,
            poster,
            posterState: poster,
          };
        }

        return mediaObj;
      });

      return { ...prev, medias: updatedMedias };
    });

    const isAnyIn = posterImages.find((id) => id === poster?.publicId);

    if (!isAnyIn) {
      dispatch(addPosterImage(poster.publicId));
    }
  };

  useEffect(() => {
    updateCloudinaryPoster();
  }, [poster]);

  return (
    <div className="flex gap-2">
      {isLoading && <Loading />}
      {!isLoading && poster && (
        <figure
          className="relative w-4 aspect-square"
          onClick={updateCloudinaryPoster}
        >
          <Image
            src={poster.url}
            fill
            alt="coverImage"
            className="object-cover"
            sizes="5vw"
          />
        </figure>
      )}
      <label
        htmlFor="coverPhoto"
        className="font-semibold text-info cursor-pointer hover:text-base-content/80"
      >
        Select from computer
        <input
          type="file"
          name="coverPhoto"
          id="coverPhoto"
          hidden
          onChange={handleChange}
          accept="image/*"
        />
      </label>
    </div>
  );
}
export default SelectFromComputerButton;

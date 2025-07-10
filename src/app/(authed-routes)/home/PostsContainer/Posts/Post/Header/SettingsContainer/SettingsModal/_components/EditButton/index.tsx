import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCreateModal } from "@/store/slices/modals";
import { PrismaPostType } from "../../../../../../../../../../../../prisma/types/post";
import { EditedMedia } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { useEffect, useState } from "react";
import {
  setLocation,
  setMediasToEdit,
  setMessage,
  setPostId,
  setSettings,
  toggleIsEditing,
} from "@/store/slices/postEdit";

function EditButton({ post }: { post: PrismaPostType }) {
  const { medias, message, location, settings } = post;

  const { isEditing, mediasToEdit } = useAppSelector((s) => s.postEdit);
  const dispatch = useAppDispatch();

  const [mediasToEditState, setMediasToEditState] = useState<EditedMedia[]>([]);

  async function urlToBlob(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    return await response.blob();
  }

  useEffect(() => {
    const convertAll = async () => {
      const edited = await Promise.all(
        medias.map(async (media) => {
          const blob = await urlToBlob(media.url);
          const { transformation, isAudioAllowed, poster, altText } = media;

          return {
            blob,
            publicId: media.publicId,
            url: media.url,
            type: media.type === "video" ? "video" : "image",
            transformation: transformation ? transformation : undefined,
            isAudioAllowed: isAudioAllowed ? isAudioAllowed : undefined,
            poster: poster
              ? {
                  publicId: poster.publicId ? poster.publicId : undefined,
                  url: poster.url ? poster.url : undefined,
                }
              : undefined,
            altText: altText ? altText : undefined,
          } satisfies EditedMedia;
        })
      );
      setMediasToEditState(edited);
    };

    convertAll();
  }, [medias]);

  useEffect(() => {
    if (mediasToEditState.length === 0) return;

    dispatch(setPostId(post.id));
    dispatch(setMediasToEdit(mediasToEditState));
    dispatch(setMessage(message));
    dispatch(
      setLocation({ id: location?.id || "", name: location?.name || "" })
    );
    dispatch(
      setSettings({
        isCountsVisible: settings?.isCountsVisible || false,
        isCommentingAllowed: settings?.isCommentingAllowed || false,
      })
    );
    dispatch(toggleIsEditing(true));
  }, [mediasToEditState]);

  const startEditing = () => {
    if (isEditing && mediasToEdit.length > 0) dispatch(toggleCreateModal());
  };

  return (
    <li className="py-1 h-12 border-b">
      <button
        type="button"
        className="w-full h-full flex justify-center items-center"
        onClick={startEditing}
      >
        Edit
      </button>
    </li>
  );
}
export default EditButton;

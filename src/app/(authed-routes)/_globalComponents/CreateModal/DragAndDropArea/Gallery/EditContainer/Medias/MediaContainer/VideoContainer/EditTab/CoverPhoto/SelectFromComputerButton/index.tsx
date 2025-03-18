import { uploadSingleImageToCloudinary } from "@/app/(authed-routes)/_globalComponents/CreateModal/apiCalls/uploadSingleImageToCloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { ChangeEvent, useEffect, useState } from "react";

function SelectFromComputerButton({ asset_id }: { asset_id: string }) {
  const { setCloudinaryMedias } = useCreateModalContext();
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList || !fileList.length) return;

    const file = fileList[0];
    setFile(file);
  };

  useEffect(() => {
    if (!file) return;
    uploadSingleImageToCloudinary(file, asset_id, setCloudinaryMedias);
  }, [file]);

  return (
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
  );
}
export default SelectFromComputerButton;

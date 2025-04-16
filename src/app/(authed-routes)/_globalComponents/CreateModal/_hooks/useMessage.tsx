import { useState } from "react";
import { LocationType } from "../Context";

export const useMessage = () => {
  const [message, setMessage] = useState("");
  const maxMessageLength: number = 2200;
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isPlacesModalOpen, setIsPlacesModalOpen] = useState(false);
  const [location, setLocation] = useState<LocationType>({ name: "", id: "" });

  return {
    message,
    setMessage,
    maxMessageLength,
    isEmojiPickerOpen,
    setIsEmojiPickerOpen,
    isPlacesModalOpen,
    setIsPlacesModalOpen,
    location,
    setLocation,
  };
};

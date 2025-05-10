"use client";

import { useEffect } from "react";

function NotificationButton() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("Notifications enabled!", {
        body: "You will now receive updates.",
        icon: "/icon.png",
      });
    }
  };

  const showNotification = () => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Hello!", {
          body: "This is a persistent notification.",
          icon: "/placeholders/avatar.webp",
        });
      });
    }
  };

  return (
    <button
      onClick={requestPermission}
      className="p-2 bg-blue-500 text-white rounded"
    >
      Enable
    </button>
  );
}

export default NotificationButton;

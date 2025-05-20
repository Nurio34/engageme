export const requestNotificationPermission = async (): Promise<{
  status: "success" | "fail";
}> => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    return { status: "success" };
  } else {
    console.error("Notification permission denied.");
    return { status: "fail" };
  }
};

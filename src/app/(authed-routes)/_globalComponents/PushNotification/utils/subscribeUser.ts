import { pushSubscribe } from "../actions/pushSubscribe";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
};

export const subscribeUser = async (userId: string) => {
  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    const { status } = await pushSubscribe(
      userId,
      JSON.stringify(subscription)
    );

    if (status === "error" || status === "fail") {
      console.log(
        "Unauthenticated user can not be subscribed to push service !"
      );
      return;
    }

    console.log("User subscribed successfully");
  } catch (err) {
    console.error(err);
  }
};

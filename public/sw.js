self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://engage-me.vercel.app/"));
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || "/icon.png",
  });
});

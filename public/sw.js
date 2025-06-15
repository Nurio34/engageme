self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  console.log({ event, data });

  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "/logo/logo.webp",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});

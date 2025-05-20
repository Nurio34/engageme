self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  console.log({ event, data });

  self.registration.showNotification(data.title, {
    body: data.message,
    icon: data.icon || "/placeholders/avatar.webp",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});

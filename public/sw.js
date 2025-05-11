// Listen for the 'push' event, which is triggered when a push notification is received.
self.addEventListener("push", function (event) {
  console.log({ event });

  if (event.data) {
    // Parse the incoming data as JSON.
    const data = event.data.json();

    // Define the notification options.
    const options = {
      // The main content of the notification.
      body: data.body,

      // Icon to display with the notification (usually the app icon).
      icon: data.icon || "/icon.png",

      // Badge to display in the notification center (small monochrome icon).
      badge: "/badge.png",

      // Vibration pattern for the notification.
      vibrate: [100, 50, 100],

      // Additional data that can be accessed in click event or later.
      data: {
        // The timestamp when the notification was received.
        dateOfArrival: Date.now(),

        // A primary key for identifying the notification.
        primaryKey: "2",
      },
    };

    // Wait until the notification is displayed before allowing the event to be completed.
    event.waitUntil(
      // Display the notification with the specified title and options.
      self.registration.showNotification(data.title, options)
    );
  }
});

// Listen for the 'notificationclick' event, triggered when the user clicks the notification.
self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");

  // Close the notification when clicked.
  event.notification.close();

  // Open the specified URL when the notification is clicked.
  event.waitUntil(clients.openWindow(process.env.NEXT_PUBLIC_WEBSITE_URL));
});

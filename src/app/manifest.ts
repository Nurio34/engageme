// Importing the MetadataRoute type from Next.js.
// This type helps define the structure of a manifest file.
import type { MetadataRoute } from "next";

// Exporting a function named "manifest" that returns an object matching the MetadataRoute.Manifest type.
export default function manifest(): MetadataRoute.Manifest {
  return {
    // The name of the PWA, displayed when the app is installed on a device.
    name: "EngageMe - Social",

    // A shorter version of the app name, shown on the home screen or app drawer.
    short_name: "EngageMe",

    // A brief description of the PWA, typically shown during the installation process.
    description: "A Progressive Web App built with Next.js",

    // The URL that the PWA opens to when launched, usually the root.
    start_url: "/",

    // How the PWA is displayed when launched from the home screen.
    // "standalone" means it will appear like a native app without browser UI.
    display: "standalone",

    // Background color of the splash screen when the PWA is loading.
    background_color: "#A020F0", //! purple

    // The theme color of the app, usually shown in the status bar or app UI.
    theme_color: "#008000", //! green

    // An array of icons that the PWA will use for app icons.
    icons: [
      {
        // Path to the first icon, usually used for smaller sizes.
        src: "/icon-192x192.png",
        // The size of the icon (width x height).
        sizes: "192x192",
        // The file type of the icon.
        type: "image/png",
      },
      {
        // Path to the second icon, typically used for larger sizes.
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

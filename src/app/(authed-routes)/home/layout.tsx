import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engage Me | Share Photos, Reels & Connect with Friends",
  description:
    "Engage Me is a modern social media app to share photos, videos, and stories with your friends. Like, comment, follow, and explore trending content—just like Instagram, but better.",
  icons: "/favicon.ico",
  openGraph: {
    title: "Engage Me | Share Photos, Reels & Connect with Friends",
    description:
      "Engage Me is a modern social media app to share photos, videos, and stories with your friends. Like, comment, follow, and explore trending content—just like Instagram, but better.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "Apartman Temizliği",
    images: [
      {
        url: `${process.env.SITE_UR}/logo/logo.webp`,
        width: 1200,
        height: 630,
        alt: "Apartman Temizliği Banner",
      },
    ],
    type: "website",
  },
  // Twitter Card tags
  twitter: {
    card: "summary_large_image",
    // site: "@yourTwitterHandle",
    // siteId: "1467726470533754880",
    // creator: "@nextjs",
    // creatorId: "1467726470533754880",
    title: "Engage Me | Share Photos, Reels & Connect with Friends",
    description:
      "Engage Me is a modern social media app to share photos, videos, and stories with your friends. Like, comment, follow, and explore trending content—just like Instagram, but better.",
    images: {
      url: `${process.env.SITE_UR}/logo/logo.webp`,
      alt: "engage me logo image",
    },
  },
  //   verification: {
  //     google: "_S6Z0GY9Hg314CuweOUWTtWyJeTPU8ARABIp2y1Y9I0",
  //   },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

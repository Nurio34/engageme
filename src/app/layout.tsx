import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Theme from "./_globalComponents/Theme";
import { Toaster } from "react-hot-toast";
import Ping from "./_globalComponents/Ping/Provider";
import RoutingAnimationBar from "./_globalComponents/RoutingAnimationBar";
import ListenResize from "./_globalComponents/ListenResize";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="light">
        <body className={`antialiased`}>
          <Theme />
          <Toaster />
          <Ping />
          <ListenResize />
          <RoutingAnimationBar />
          <SpeedInsights />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

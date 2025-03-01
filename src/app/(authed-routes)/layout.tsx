import CreateModal from "./_globalComponents/CreateModal";
import SideMenu from "./_globalComponents/SideMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <SideMenu />
      <CreateModal />
      {children}
    </main>
  );
}

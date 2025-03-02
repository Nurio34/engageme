import CreateModal from "./_globalComponents/CreateModal";
import SideMenu from "./_globalComponents/SideMenu";
import WannaCloseCreateModal_Modal from "./_globalComponents/WannaCloseCreateModal_Modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <SideMenu />
      <CreateModal />
      <WannaCloseCreateModal_Modal />
      {children}
    </main>
  );
}

import CreateModal from "./_globalComponents/CreateModal";
import SideMenu from "./_globalComponents/SideMenu";
import WannaCloseCreateModal_Modal from "./_globalComponents/WannaCloseCreateModal_Modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:grid md:grid-cols-[73px,1fr] lg:grid-cols-[auto,1fr] xxl:grid-cols-[335px,1fr]">
      <SideMenu />
      <CreateModal />
      <WannaCloseCreateModal_Modal />

      {children}
    </div>
  );
}

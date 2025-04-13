import CreateModal from "./_globalComponents/CreateModal";
import SideMenu from "./_globalComponents/SideMenu";
import WannaCloseCreateModal_Modal from "./_globalComponents/WannaCloseCreateModal_Modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid md:grid-cols-[84px,1fr] lg:grid-cols-[227px,1fr]">
      <SideMenu />
      <CreateModal />
      <WannaCloseCreateModal_Modal />

      {children}
    </div>
  );
}

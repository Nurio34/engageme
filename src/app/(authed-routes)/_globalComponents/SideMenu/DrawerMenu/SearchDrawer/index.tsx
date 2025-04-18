import { useAppSelector } from "@/store/hooks";

function SearchDrawer({ navWidth }: { navWidth: number }) {
  const { isDrawerMenuOpen, currentMenu } = useAppSelector((s) => s.sideMenu);
  return (
    <div
      className={`fixed z-10 top-0 left-0 w-[397px] h-full transition-transform duration-300
        bg-base-100 rounded-tr-xl rounded-br-xl shadow-[0px_0px_30px_0px]  
      `}
      style={{
        transform:
          isDrawerMenuOpen && currentMenu === "search"
            ? `translateX(calc(0% + ${navWidth}px))`
            : "translateX(-100%)",
      }}
    >
      SearchDrawer
    </div>
  );
}
export default SearchDrawer;

import InstagramLogoIcon from "@/app/_globalComponents/Svg/InstagramLogoIcon";
import { useAppSelector } from "@/store/hooks";

function Client() {
  const { device } = useAppSelector((s) => s.modals);
  const { type, width, height } = device;
  const isDesktop = type === "desktop";
  const ratio = width / height;

  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  return (
    <div
      className={`hidden md:flex justify-center items-center lg:justify-start
        text-2xl lg:pl-3  ${!isDesktop && ratio > 1 ? "" : "pt-6 pb-9"}
      `}
    >
      {!isDrawerMenuOpen && (
        <div className={`block lg:hidden`}>
          <InstagramLogoIcon />
        </div>
      )}
      <div className="min-h-8 grid place-content-center">
        {!isDrawerMenuOpen ? (
          <div className="hidden lg:block lg:grow min-w-max ">Engage Me</div>
        ) : (
          <InstagramLogoIcon />
        )}
      </div>
    </div>
  );
}
export default Client;

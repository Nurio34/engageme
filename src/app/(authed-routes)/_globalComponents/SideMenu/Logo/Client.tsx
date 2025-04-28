import InstagramLogoIcon from "@/app/_globalComponents/Svg/InstagramLogoIcon";
import { useAppSelector } from "@/store/hooks";

function Client() {
  const { device } = useAppSelector((s) => s.modals);
  const { height } = device;

  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  return (
    height > 525 && (
      <div
        className={`hidden md:flex justify-center items-center lg:justify-start overflow-hidden
        text-2xl lg:pl-3  ${height > 525 ? "pt-6 pb-9" : ""}
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
    )
  );
}
export default Client;

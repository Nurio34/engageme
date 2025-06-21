import CameraIcon from "@/app/_globalComponents/Svg/CameraIcon";

function Header() {
  return (
    <div className="flex justify-center">
      <div
        className="grid justify-items-center
          pt-[60px] px-11
        "
      >
        <CameraIcon size={62} />
        <p className="text-3xl font-extrabold ">No Posts Yet</p>
      </div>
    </div>
  );
}
export default Header;

import Chevron from "@/app/_globalComponents/Svg/Chevron";

function Footer() {
  return (
    <footer className="my-[52px] px-3">
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-3 items-center pb-3">
        <li className="text-xs text-base-content/50">Meta</li>
        <li className="text-xs text-base-content/50">About</li>
        <li className="text-xs text-base-content/50">Blog</li>
        <li className="text-xs text-base-content/50">Jobs</li>
        <li className="text-xs text-base-content/50">Help</li>
        <li className="text-xs text-base-content/50">API</li>
        <li className="text-xs text-base-content/50">Privacy</li>
        <li className="text-xs text-base-content/50">Terms</li>
        <li className="text-xs text-base-content/50">Locations</li>
        <li className="text-xs text-base-content/50">Instagram Lıte</li>
        <li className="text-xs text-base-content/50">Threads</li>
        <li className="text-xs text-base-content/50">
          Contact Uploading & Non-Users
        </li>
        <li className="text-xs text-base-content/50">Meta Verified</li>
      </ul>
      <div className="flex flex-wrap justify-center items-center gap-x-4 py-3">
        <div className="flex items-center gap-x-1">
          <span className="text-xs text-base-content/50">English</span>
          <Chevron rotate={180} size={3} />
        </div>
        <p className="text-xs text-base-content/50">
          © 2025 EngageMe from Teta
        </p>
      </div>
    </footer>
  );
}
export default Footer;

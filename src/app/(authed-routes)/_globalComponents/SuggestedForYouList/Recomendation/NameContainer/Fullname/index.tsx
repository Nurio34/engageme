function Fullname({ fullname }: { fullname: string }) {
  return (
    <p className="text-sm font-normal leading-[18px] text-base-content/50 capitalize">
      {fullname}
    </p>
  );
}
export default Fullname;

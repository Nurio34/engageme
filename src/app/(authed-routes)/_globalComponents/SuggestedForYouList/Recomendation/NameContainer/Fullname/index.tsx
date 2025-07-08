function Fullname({
  fullname,
  name,
}: {
  fullname: string | null;
  name: string;
}) {
  const isFullnameNull =
    !fullname || fullname.split(" ").every((name) => name === "null");

  return (
    <p className="text-sm font-normal leading-[18px] text-base-content/50 capitalize">
      {isFullnameNull ? name : fullname}
    </p>
  );
}
export default Fullname;

function Fullname({
  fullname,
  name,
}: {
  fullname: string | null;
  name: string;
}) {
  const isFullnameNull =
    !fullname || fullname.split(" ").every((name) => name === "null");

  //! this will be full name
  return (
    <p className="capitalize text-base-content/50 text-sm">
      {isFullnameNull ? name : fullname}
    </p>
  );
}
export default Fullname;

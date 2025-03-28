import Link from "next/link";

function Error() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Link href={"/onboarding"} className="btn btn-primary">
        Solve The Problem
      </Link>
    </div>
  );
}
export default Error;

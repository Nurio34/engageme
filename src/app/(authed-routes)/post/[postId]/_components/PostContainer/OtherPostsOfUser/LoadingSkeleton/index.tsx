import Link from "next/link";

function LoadingSkeleton({ username }: { username: string }) {
  return (
    <div className="flex justify-center">
      <div className="py-9 border-t">
        <h1 className="flex items-start gap-x-1 pb-5">
          <p className="font-semibold text-sm text-base-content/60">
            More posts from
          </p>
          <Link
            className="font-semibold text-sm underline-offset-2 hover:underline"
            href={`/${username}`}
            prefetch
          >
            {username}
          </Link>
        </h1>
        <ul className="grid grid-cols-[repeat(3,minmax(0,307.67px))] gap-1">
          {Array(6)
            .fill("#")
            .map((_, ind) => (
              <li
                key={ind}
                className="relative aspect-[0.75] cursor-pointer bg-base-content/70 animate-pulse "
              ></li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export default LoadingSkeleton;

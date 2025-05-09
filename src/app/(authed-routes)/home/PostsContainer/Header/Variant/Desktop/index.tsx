import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type CurrentVariantType = "for-you" | "followings" | "favorites";

function Desktop() {
  const path = usePathname();

  const searchParams = useSearchParams();
  const variant = searchParams.get("variant");

  const [currentVariant, setCurrentVariant] =
    useState<CurrentVariantType>("for-you");

  useEffect(() => {
    if (!variant) setCurrentVariant("for-you");
    else {
      if (variant === "for-you") setCurrentVariant("for-you");
      else if (variant === "followings") setCurrentVariant("followings");
      else setCurrentVariant("favorites");
    }
  }, [path, variant]);

  return (
    <div className="space-x-4">
      <Link
        className={`font-bold ${
          currentVariant === "for-you"
            ? "text-base-content"
            : "text-base-content/50"
        }    
        `}
        href={"/home?variant=for-you"}
      >
        For you
      </Link>
      <Link
        className={`font-bold ${
          currentVariant === "followings"
            ? "text-base-content"
            : "text-base-content/50"
        }   `}
        href={"/home?variant=followings"}
      >
        Following
      </Link>
      <Link
        className={`font-bold ${
          currentVariant === "favorites"
            ? "text-base-content"
            : "text-base-content/50"
        }   `}
        href={"/home?variant=favorites"}
      >
        Favorites
      </Link>
    </div>
  );
}
export default Desktop;

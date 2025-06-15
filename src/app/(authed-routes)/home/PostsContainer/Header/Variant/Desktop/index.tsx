import { useAppDispatch } from "@/store/hooks";
import { ended, started } from "@/store/slices/routing";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type CurrentVariantType = "home" | "followings" | "favorites";

function Desktop() {
  const dispatch = useAppDispatch();

  const path = usePathname();

  const searchParams = useSearchParams();
  const variant = searchParams.get("variant");

  const [currentVariant, setCurrentVariant] =
    useState<CurrentVariantType>("home");

  useEffect(() => {
    if (!variant) setCurrentVariant("home");
    else {
      if (variant === "home") setCurrentVariant("home");
      else if (variant === "followings") setCurrentVariant("followings");
      else setCurrentVariant("favorites");
    }
  }, [path, variant]);

  return (
    <div className="space-x-4">
      <Link
        className={`font-bold ${
          currentVariant === "home"
            ? "text-base-content"
            : "text-base-content/50"
        }    
        `}
        href={"/home?variant=home"}
        onClick={() => dispatch(started())}
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
        onClick={() => dispatch(started())}
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
        onClick={() => dispatch(started())}
      >
        Favorites
      </Link>
    </div>
  );
}
export default Desktop;

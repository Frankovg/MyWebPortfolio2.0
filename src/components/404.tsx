import Link from "next/link";
import H3 from "./primitives/h3";
import { FrownIcon } from "lucide-react";

export const ErrorPage = async () => {
  return (
    <div className="absolute w-full h-full">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <FrownIcon size={170} />
        <H3 className="text-3xl font-semibold text-danger">404 - Page not found</H3>
        <p className="text-3xl font-bold">
          The link might be corrupted.
        </p>
        <p className="text-lg">or the page may have been removed</p>
        <div className="my-10">
          <Link
            href="/"
            className="uppercase p-3 border border-white"
          >
            go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

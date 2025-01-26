import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";

// unknown routes will be redirected to home
export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.HOME);
  }, []);

  return <h1 className="flex text-lg font-black justify-center m-10">404 - Page Not Found</h1>;
}

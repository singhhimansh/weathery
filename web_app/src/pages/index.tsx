import { useRouter } from "next/router";
import { useEffect } from "react";
import { ROUTES } from "../utils/routes";

// '/' redirected to /home
export default function Home() {
  const router=  useRouter();
  useEffect(()=>{
    router.push(ROUTES.HOME)
  },[router])
  return (
    <div className={``}>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import animationData from "@/public/static/illustration/404NotFound.json";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/chat");
  };

  return (
    <div className="flex flex-col justify-center items-center h-dvh w-full gap-6">
      <div className="flex justify-center items-center">
        <Lottie animationData={animationData} loop={true} className="w-3/4" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4">Oops! Page Not Found (404)</h1>
        <p className="text-lg mb-2 text-center max-w-md text-gray-400 font-">
          It looks like we’ve wandered off the map. The page you’re looking for
          might have moved, been deleted, or never existed in the first place.
        </p>
        <p className="text-base font-normal mb-6 text-center max-w-md">
          <span>
            Check the URL, head back to the{" "}
            <Button variant="outline" onClick={handleGoHome}>
              Return To Home
            </Button>
          </span>
        </p>
      </div>
      <p className="text-base font-normal text-center">
        <span className="font-semibold">Still lost?</span> Contact us for help!
      </p>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import loadingAnimation from "../public/static/illustration/loading.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Lottie animationData={loadingAnimation} loop={true} className="w-3/4" />
    </div>
  );
}

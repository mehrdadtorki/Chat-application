"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import animationData from '../../public/static/illustration/loading.json'
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Modal({ isOpen, onClose, children, isLoading }) {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white p-5 rounded-lg shadow-lg w-[400px]"
      >
        {/* Show Lottie animation if loading, otherwise show content */}
        {isLoading ? (
          <div className="flex justify-center">
            <Lottie animationData={animationData} loop={true} className="w-3/4" />
          </div>
        ) : (
          <>
            {children}
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

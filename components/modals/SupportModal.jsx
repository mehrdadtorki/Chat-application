"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import animationData from "../../public/static/illustration/loading.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function SupportModal({ isOpen, setIsOpen, isLoading }) {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="w-full fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="rounded-lg shadow-lg lg:w-3/5"
      >
        {isLoading ? (
          <div className="flex justify-center">
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-3/4"
            />
          </div>
        ) : (
          <Card className="w-full max-h-[80vh] overflow-y-auto text-gray-800 p-0 shadow-lg relative">
            <CardHeader className="sticky top-0 bg-inherit p-6 border-b">
              <CardTitle className="text-2xl font-bold text-blue-500">
                Support Center
              </CardTitle>
              <p className="text-sm text-gray-500">
                We’re here to help with any questions or issues!
              </p>
              <Button
                variant="ghost"
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </Button>
            </CardHeader>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 space-y-8"
            >
              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-400">
                  Contact Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className="shadow-md"
                    style={{
                      backgroundImage: `url(/static/illustration/shapeBG.svg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Mail className="w-5 h-5 text-blue-600" />
                        Email Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full text-sm hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        mehrdadtorki1381@gmail.com
                      </Button>
                    </CardContent>
                  </Card>
                  <Card
                    className="shadow-md"
                    style={{
                      backgroundImage: `url(/static/illustration/shapeBG.svg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Phone className="w-5 h-5 text-blue-600" />
                        Phone Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full text-sm hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        +98 (901) 529-7009
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-4 rounded-lg"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-400">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-md font-bold text-blue-500">
                      How do I reset my password?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-blue-200">
                      Go to the login page, click "Forgot Password," and follow
                      the instructions sent to your email.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-md font-bold text-blue-500">
                      Where can I find billing info?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-blue-200">
                      Billing information is available in your account settings
                      under the "Billing" tab.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-md font-bold text-blue-500">
                      What are your support hours?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-blue-200">
                      We offer support Monday to Friday, 9 AM to 5 PM EST.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-400">
                  Documentation
                </h2>
                <ul className="grid grid-cols-1 gap-4">
                  <li>
                    <a
                      href="#"
                      className="block p-3 rounded-lg shadow hover:shadow-xl transition-shadow text-blue-500 hover:underline text-sm font-medium"
                    >
                      Getting Started Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-3 rounded-lg shadow hover:shadow-xl transition-shadow text-blue-500 hover:underline text-sm font-medium"
                    >
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-3 rounded-lg shadow hover:shadow-xl transition-shadow text-blue-500 hover:underline text-sm font-medium"
                    >
                      Troubleshooting
                    </a>
                  </li>
                </ul>
              </motion.section>
            </motion.div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}

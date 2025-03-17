"use client"; // Required for client-side components in Next.js App Router

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function SupportModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4 z-50">
          Support
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gray-50 text-gray-800 p-0">
        <DialogHeader className="sticky top-0 bg-white z-10 p-6 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Support Center
          </DialogTitle>
          <p className="text-sm text-gray-600">
            We’re here to help with any questions or issues!
          </p>
        </DialogHeader>

        {/* Modal Body */}
        <div className="relative p-6 space-y-8">
          {/* Contact Us Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <div className="grid grid-cols-1 gap-4">
              <Card className="shadow-md">
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
                    support@example.com
                  </Button>
                </CardContent>
              </Card>
              <Card className="shadow-md">
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
                    +1 (555) 123-4567
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-100 p-4 rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm">
                  How do I reset my password?
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  Go to the login page, click "Forgot Password," and follow the
                  instructions sent to your email.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm">
                  Where can I find billing info?
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  Billing information is available in your account settings
                  under the "Billing" tab.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm">
                  What are your support hours?
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  We offer support Monday to Friday, 9 AM to 5 PM EST.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.section>

          {/* Documentation Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4">Documentation</h2>
            <ul className="grid grid-cols-1 gap-4">
              <li>
                <a
                  href="#"
                  className="block p-3 bg-white rounded-lg shadow hover:shadow-xl transition-shadow text-blue-600 hover:underline text-sm"
                >
                  Getting Started Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-3 bg-white rounded-lg shadow hover:shadow-xl transition-shadow text-blue-600 hover:underline text-sm"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-3 bg-white rounded-lg shadow hover:shadow-xl transition-shadow text-blue-600 hover:underline text-sm"
                >
                  Troubleshooting
                </a>
              </li>
            </ul>
          </motion.section>
        </div>

        {/* Decorative SVG Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-none"
          >
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="40" stroke="gray" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" stroke="gray" strokeWidth="2" />
            </pattern>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            />
          </svg>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutate } from "@/hooks/useMutations";

const feedbackSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export default function FeedbackModal({ isOpen, setIsOpen }) {
  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  if (!isOpen) return null;

  const { mutate, isPending } = useMutate("/api/feedback", "POST", {
    onSuccess: () => {
      toast.success("Thank you for youre feedback");
      form.reset();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.error || "An error occurred. Please try again."
      );
      toast.error(
        error.message || "Oops! Youre feedback cant be send. Please try again"
      );
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-1000">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg shadow-lg w-full max-w-md"
      >
        <Card
          className="w-full text-gray-800 p-0 shadow-lg relative"
          style={{
            backgroundImage: `url(/static/illustration/shapeBG.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <CardHeader className="sticky top-0 p-6 border-b">
            <CardTitle className="text-2xl font-bold text-blue-500">
              Send Us Feedback
            </CardTitle>
            <p className="text-sm text-gray-500">
              We’d love to hear your thoughts!
            </p>
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </CardHeader>

          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="text-sm text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your email"
                            className="text-sm text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your feedback"
                            className="text-sm text-gray-800"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Feedback
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

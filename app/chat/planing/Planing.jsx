"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Stars, Sparkles, Gem } from "lucide-react";
import clsx from "clsx";

const plans = [
  {
    title: "Free",
    price: "0",
    icon: <Stars className="w-6 h-6 text-blue-500" />,
    features: ["Basic access", "Community support", "Single project"],
    cta: "Your current plan",
    highlight: false,
  },
  {
    title: "Pro",
    price: "19",
    icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
    features: [
      "All Free features",
      "Priority support",
      "Multiple projects",
      "Advanced analytics",
    ],
    cta: "Upgrade now",
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    icon: <Gem className="w-6 h-6 text-purple-600 dark:text-purple-300" />,
    features: [
      "All Pro features",
      "Unlimited members",
      "Custom integrations",
      "Dedicated support",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export default function UpgradeToProPage() {
  return (
    <div
      className="relative h-full w-full py-24 px-6 flex flex-col items-center justify-center bg-background overflow-hidden"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1012%26quot%3b)' fill='none'%3e%3cpath d='M-43.26 367.11C107.04 361.54 293.96 119.35 505.57 120.71 717.19 122.07 664.47 503.64 779.99 563.99' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M-250.99 189.95C-107.71 189.41 10.09 70.59 311.1 77.95 612.11 85.31 682.16 580.16 873.19 622.2' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M-154.76 45.56C-35.7 46.62 41.87 151.35 305.29 168.76 568.7 186.17 615.97 537.88 765.33 563.69' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M-40.24 282.52C73.93 282.73 185.4 352.52 411.04 352.52 636.68 352.52 623.48 278.09 862.32 282.52 1101.16 286.95 1167.6 641.45 1313.6 666.18' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M-252.8 363.06C-90.3 357.65 41.65 104.78 344.37 105.46 647.08 106.14 755.24 537.22 941.53 562.42' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1012'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e\")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          Supercharge with Pro
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Unlock powerful tools, collaboration, and enterprise-level features.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid gap-10 md:grid-cols-3 mt-16 px-6 max-w-6xl w-full">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <Card
              className={clsx(
                "relative overflow-hidden rounded-3xl p-6 shadow-xl border border-muted transition-all duration-300 group backdrop-blur-lg transform hover:scale-[1.03] hover:shadow-2xl",
                plan.highlight
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/10 border-blue-400/40"
                  : "bg-white/50 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-900/50"
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                {plan.icon}
                <h3 className="text-xl font-semibold">{plan.title}</h3>
              </div>

              <div className="text-3xl font-bold text-foreground mb-6">
                {plan.price === "Custom" ? (
                  <span className="text-lg">Contact us</span>
                ) : (
                  `$${plan.price}/mo`
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <CheckCircle2 className="text-green-500 w-4 h-4" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "default" : "outline"}
                className={clsx(
                  "w-full rounded-full font-semibold",
                  plan.highlight &&
                    "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:opacity-90 animate-gradient"
                )}
              >
                {plan.cta}
              </Button>

              {/* Glow effect */}
              {plan.highlight && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  whileHover={{ opacity: 0.25 }}
                  className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-500 via-purple-500 to-transparent"
                />
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

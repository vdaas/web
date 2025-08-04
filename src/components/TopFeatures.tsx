"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const features = [
  {
    title: "Distributed Architecture",
    description:
      "Vald distributes the data across multiple Nodes to avoid single points of failure and achieve high availability and scalability.",
    lightIcon: "/icons/distributed-light.svg",
    darkIcon: "/icons/distributed-dark.svg",
  },
  {
    title: "High Availability",
    description:
      "Ensure your system is up and running with minimal downtime through our high availability solutions.",
    lightIcon: "/icons/availability-light.svg",
    darkIcon: "/icons/availability-dark.svg",
  },
  {
    title: "Scalability",
    description:
      "Our architecture is designed to scale seamlessly to meet the growing demands of your application.",
    lightIcon: "/icons/scalability-light.svg",
    darkIcon: "/icons/scalability-dark.svg",
  },
  {
    title: "Data Security",
    description:
      "We prioritize security to ensure your data is protected at every layer of the system.",
    lightIcon: "/icons/security-light.svg",
    darkIcon: "/icons/security-dark.svg",
  },
];

export default function FeaturesSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <section className="py-16 px-4 dark:bg-boundarydarkGray">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {"Vald's Features"}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`rounded-2xl p-8 hover:shadow-lg transition-all duration-300 ${
                isDark
                  ? "bg-boundarydarkGray border-boundaryBlack"
                  : "bg-boundaryLightGray border-boundaryWhite"
              }`}
            >
              <CardContent className="text-center space-y-4 p-0">
                {/* Custom Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <img
                      src={isDark ? feature.darkIcon : feature.lightIcon}
                      alt={`${feature.title} icon`}
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className={`leading-relaxed ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

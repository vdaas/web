import type { Metadata } from "next";
import CardGrid from "@/components/CardGrid";
import TopFeatures from "@/components/TopFeatures";
import TopGifsection from "@/components/TopGifsection";
import TopApis from "@/components/TopApis";
import TopTechs from "@/components/TopTechs";
import TopArticles from "@/components/TopArticles";
import TopUsers from "@/components/TopUsers";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "top",
  description: "top",
};

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[var(--light-bg)] text-primary dark:text-secondary">
        <section className="pt-16 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary text-white px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            A Highly Scalable Distributed <br />
            Vector Search Engine
          </h1>

          <p className="text-sm md:text-lg text-white/80 max-w-2xl mb-8">
            Vald is designed and implemented based on the Cloud-Native
            architecture. It uses the fastest ANN Algorithm NGT to search
            neighbors. Vald has automatic vector indexing and index backup, and
            horizontal scaling which made for searching from billions of feature
            vector data. Vald is easy to use, feature-rich and highly
            customizable as you need.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl mx-auto">
            <button className="w-full md:w-auto flex-1 bg-teal-700 text-white font-semibold py-3 px-6 rounded-md hover:bg-teal-600">
              Get Started
            </button>
            <button className="w-full md:w-auto flex-1 border border-white text-white font-semibold py-3 px-6 rounded-md hover:bg-white hover:text-teal-700">
              Learn More
            </button>
            <button className="w-full md:w-auto flex-1 border border-white text-white font-semibold py-3 px-6 rounded-md hover:bg-white hover:text-teal-700">
              Join Vald Slack
            </button>
          </div>
        </section>

        <TopFeatures />
        <TopGifsection />
        <TopApis />
        <TopTechs />
        <TopUsers />
        <TopArticles />
      </div>
    </>
  );
}

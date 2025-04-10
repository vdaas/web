import type { Metadata } from "next";
import CardGrid from "@/components/CardGrid";
import TopApis from "@/components/TopApis";
import TopTechs from "@/components/TopTechs";
import TopArticles from "@/components/TopArticles";
import TopUsers from "@/components/TopUsers";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "top",
  description: "top",
};

const codeSnippets = {
  connect: `import grpc
from vald.v1.vald import insert_pb2_grpc
from vald.v1.vald import search_pb2_grpc
from vald.v1.vald import update_pb2_grpc
from vald.v1.vald import remove_pb2_grpc
from vald.v1.vald import flush_pb2_grpc
from vald.v1.payload import payload_pb2

channel = grpc.insecure_channel("{vald cluster host}:{port}")`,
  insert: `stub = insert_pb2_grpc.InsertStub(channel)
req = insert_pb2.InsertRequest(id="id", vector=[0.1, 0.2, 0.3])
res = stub.Insert(req)`,
  search: `stub = search_pb2_grpc.SearchStub(channel)
req = search_pb2.SearchRequest(vector=[0.1, 0.2, 0.3])
res = stub.Search(req)`,
  update: `stub = update_pb2_grpc.UpdateStub(channel)
req = update_pb2.UpdateRequest(id="id", vector=[0.4, 0.5, 0.6])
res = stub.Update(req)`,
  delete: `stub = remove_pb2_grpc.RemoveStub(channel)
req = remove_pb2.RemoveRequest(id="id")
res = stub.Remove(req)`,
  upsert: `stub = upsert_pb2_grpc.UpsertStub(channel)
req = upsert_pb2.UsertRequest(id="id", vector=[0.4, 0.5, 0.6])
res = stub.Upsert(req)`,
  "get object": `stub = upsert_pb2_grpc.UpsertStub(channel)
req = upsert_pb2.UsertRequest(id="id", vector=[0.4, 0.5, 0.6])
res = stub.Upsert(req)`,
};


const features = [
  {
    title: "Distributed Architecture",
    description:
      "Vald distributes the data across multiple Nodes to avoid single points of failure and achieve high availability and scalability.",
    icon: {
      light: "/images/icon_features_01_light.svg",
      dark: "/images/icon_features_01_dark.svg",
    },
  },
  {
    title: "High Availability",
    description:
      "Ensure your system is up and running with minimal downtime through our high availability solutions.",
    icon: {
      light: "/images/icon_features_02_light.svg",
      dark: "/images/icon_features_02_dark.svg",
    },
  },
  {
    title: "Scalability",
    description:
      "Our architecture is designed to scale seamlessly to meet the growing demands of your application.",
    icon: {
      light: "/images/icon_features_03_light.svg",
      dark: "/images/icon_features_03_dark.svg",
    },
  },
  {
    title: "Data Security",
    description:
      "We prioritize security to ensure your data is protected at every layer of the system.",
    icon: {
      light: "/images/icon_features_04_light.svg",
      dark: "/images/icon_features_04_dark.svg",
    },
  },
];

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

        <section className="py-16 bg-boundaryWhite dark:bg-boundaryBlack px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary dark:text-secondary">
            Vald&apos;s Features test
          </h2>
          <section className="py-12 bg-boundaryWhite dark:bg-boundaryBlack">
            <div className="max-w-6xl mx-auto px-6">
              {/* グリッドレイアウト (スマホ1カラム, タブレット以上2カラム) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white border border-boundaryLightGray rounded-lg px-6 py-8 text-center dark:bg-black border-boundarydarkGray"
                  >
                    <img
                      src={feature.icon.light}
                      alt={feature.title}
                      className="w-12 h-12 mx-auto mb-4 dark:hidden"
                    />
                    <img
                      src={feature.icon.dark}
                      alt={feature.title}
                      className="w-12 h-12 mx-auto mb-4 hidden dark:block"
                    />
                    <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-black dark:text-white">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

        <section className="py-16 max-w-6xl mx-auto bg-[var(--light-bg)] px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start md:space-x-12">
            {/* テキストコンテンツ */}
            <div className="w-full text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-4">
                Easy to use
              </h2>
              <p className="text-lg text-black dark:text-white">
                Vald can be easily installed in a few steps.
              </p>
            </div>

            {/* GIF画像 */}
            <div className="w-full flex justify-center">
              <img
                src="/images/sample_erminal.gif"
                alt="Command line demo"
                className="rounded-lg shadow-md w-full md:max-w-[50vw]"
              />
            </div>
          </div>
        </section>

        <TopApis />
        <TopTechs />
        <TopUsers />
        <TopArticles />
      </div>
    </>
  );
}

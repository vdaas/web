import type { Metadata } from "next";
import CardGrid from "@/components/CardGrid"; 
import APITabs from "@/components/APITabs"; 
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
};


export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ファーストビューセクション */}
      <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary text-white px-6 text-center">
      {/* 見出し */}
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        A Highly Scalable Distributed <br />
        Vector Search Engine
      </h1>

      {/* 説明文 */}
      <p className="text-sm md:text-lg text-white/80 max-w-2xl mb-8">
        Vald is designed and implemented based on the Cloud-Native architecture.
        It uses the fastest ANN Algorithm NGT to search neighbors. Vald has
        automatic vector indexing and index backup, and horizontal scaling which
        made for searching from billions of feature vector data. Vald is easy to
        use, feature-rich and highly customizable as you need.
      </p>

      {/* ボタン群 */}
      <div className="flex flex-col md:flex-row items-stretch justify-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-md">
        <Button
          href="/get-started"
          className="bg-teal-700 hover:bg-teal-600 text-white min-w-[150px] px-6 py-4"
        >
          Get Started
        </Button>
        <Button
          href="/learn-more"
          className="border border-white text-white hover:bg-white hover:text-teal-700 min-w-[150px] px-6 py-4"
        >
          Learn More
        </Button>
        <Button
          href="/join-slack"
          className="border border-white text-white hover:bg-white hover:text-teal-700 min-w-[150px] px-6 py-4"
        >
          Join Vald Slack
        </Button>
      </div>
    </section>

      {/* 特徴セクション */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
        <CardGrid /> {/* カードグリッドセクションを追加 */}
      </section>

      <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-12">
        {/* 左側のテキストコンテンツ */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-primary mb-4">Easy to use</h2>
          <p className="text-lg text-gray-700">
            Vald can be easily installed in a few steps.
          </p>
        </div>

        {/* 右側のGIF画像 */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img 
            src="/images/sample_erminal.gif" 
            alt="Command line demo"
            className="rounded-lg shadow-md w-full max-w-lg"
          />
        </div>
      </div>
    </section>

    <APITabs /> 

      {/* ユーザーセクション */}
      <section className="py-16 bg-gray-50 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
            <img
              src="https://via.placeholder.com/64"
              alt="User 1"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">User 1</h3>
              <p className="text-gray-600">
                "This OSS has transformed the way I work on projects!"
              </p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
            <img
              src="https://via.placeholder.com/64"
              alt="User 2"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">User 2</h3>
              <p className="text-gray-600">
                "Incredible features and easy to use."
              </p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
            <img
              src="https://via.placeholder.com/64"
              alt="User 3"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">User 3</h3>
              <p className="text-gray-600">
                "Highly recommend this for anyone in tech!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

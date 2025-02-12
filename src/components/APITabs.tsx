"use client"; // useState を使うために必要

import React, { useState } from "react";

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

export default function APITabs() {
  const [activeTab, setActiveTab] = useState<keyof typeof codeSnippets>("connect");

  return (
    <section className="py-16 bg-gray-50 px-6">
      {/* グリッドレイアウト: スマホは1列, PCは2列 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左側 (コード & タブ) */}
        <div className="flex flex-col">
          {/* コードブロック (高さを一定に) */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 min-h-[200px] flex items-start">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap w-full">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>

          {/* タブメニュー (選択タブのデザイン改善) */}
          <div className="mt-4 border-b border-gray-300 flex">
            {Object.keys(codeSnippets).map((key) => (
              <button
                key={key}
                className={`py-2 px-4 text-sm font-semibold transition-all duration-200 ${
                  activeTab === key
                    ? "text-black border-b-2 border-black" // 選択中のタブ
                    : "text-gray-400 hover:text-gray-600" // 非選択のタブ
                }`}
                onClick={() => setActiveTab(key as keyof typeof codeSnippets)}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* 右側 (API 説明) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-bold text-primary mb-4">Simple APIs</h2>
          <p className="text-lg text-gray-700">
            Vald provides Insert, Update, Upsert, Search, and Delete APIs.
          </p>
        </div>
      </div>
    </section>
  );
}

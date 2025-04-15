import React from "react";

type cardProps = {
    name: string;
    image: string;
    link: string;
}

type gridCardProps = {
  keyName: string;
  value: cardProps[];
}

const baseTechnologies: cardProps[] = [
  { name: "Go", image: "images/logo_go.svg", link: "https://golang.org/" },
  {
    name: "Rust",
    image: "images/logo_rust.svg",
    link: "https://www.rust-lang.org/",
  },
  { name: "gRPC", image: "images/logo_grpc.svg", link: "https://grpc.io/" },
  {
    name: "Docker",
    image: "images/logo_docker.svg",
    link: "https://www.docker.com/",
  },
  {
    name: "Kubernetes",
    image: "images/logo_k8s.svg",
    link: "https://kubernetes.io/",
  },
  { name: "HELM", image: "images/logo_helm.svg", link: "https://helm.sh/" },
  {
    name: "NGT",
    image: "images/logo_ngt.svg",
    link: "https://github.com/yahoojapan/NGT",
  },
  { name: "FAISS", image: "images/logo_faiss.svg", link: "https://faiss.ai/" },
  {
    name: "Userach",
    image: "images/logo_userach.svg",
    link: "https://userach.com/",
  },
];

const sdks: cardProps[] = [
  { name: "Go", image: "images/logo_go.svg", link: "https://golang.org/" },
  {
    name: "Java",
    image: "images/logo_java.svg",
    link: "https://www.java.com/",
  },
  {
    name: "Python",
    image: "images/logo_python.svg",
    link: "https://www.python.org/",
  },
  {
    name: "Node.js",
    image: "images/logo_nodejs.svg",
    link: "https://nodejs.org/",
  },
  {
    name: "Rust",
    image: "images/logo_rust.svg",
    link: "https://www.rust-lang.org/",
  },
];

const GenCard: React.FC<gridCardProps> = ({ keyName, value }) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-primary mb-8">{keyName}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
        {value.map((info, idx) => (
          <a
            key={idx}
            href={info.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <img
              src={info.image}
              alt={info.name}
              className="h-12 w-12 object-contain mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">{info.name}</p>
          </a>
        ))}
      </div>
    </>
  );
}

export default function TechGrid() {
  return (
    <section className="py-16 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Base Technologies */}
        <GenCard keyName="Base Technologies" value={baseTechnologies} />
        {/* SDKs */}
        <GenCard keyName="SDKs" value={sdks} />
      </div>
    </section>
  );
}

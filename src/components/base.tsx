import Header from "./header";
import Footer from "./footer";

export default function Base({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className={className}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

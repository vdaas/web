import Header from "./header";
import Header2 from "./header2";
import Footer from "./footer";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "./ThemeToggle";
import { ImRocket } from "react-icons/im";

export default function Base({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <Header2 />
        <main className={className}>{children}</main>
        <Footer />
        {/* <ThemeToggle /> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}

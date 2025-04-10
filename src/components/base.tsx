import Header from "./header";
import Footer from "./footer";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "./ThemeToggle";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className={className}>{children}</main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}

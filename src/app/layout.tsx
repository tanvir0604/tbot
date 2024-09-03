import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/_template/ThemeProvider"
import Container from "@/components/_template/Container";
import Main from "@/components/_template/Main";
import Header from "@/components/_template/Header";
import Footer from "@/components/_template/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trading Bot",
  description: "Teka kamaite chaile use koren!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-400`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Container>
            <Header />
            <Main>
              {children}
            </Main>
            <Footer/>
            <Toaster />
          </Container>
          </ThemeProvider>
          <script async src="https://s3.tradingview.com/tv.js"></script>
        </body>
    </html>
  );
}

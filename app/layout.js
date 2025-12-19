import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Butt Networks | Professional Web Development Company",
  description:
    "Butt Networks is a full-stack web development company delivering modern, responsive, and high-performance websites & applications tailored to your business needs.",
  keywords: [
    "Butt Networks",
    "web development",
    "Next.js",
    "React",
    "Tailwind CSS",
    "frontend development",
    "backend development",
    "full stack web development",
    "Pakistan web development company",
  ],
  authors: [{ name: "Butt Networks" }],
  creator: "Butt Networks",
  publisher: "Butt Networks",
  openGraph: {
    title: "Butt Networks | Professional Web Development Company",
    description:
      "Modern and scalable websites & apps built with the latest technologies. Partner with Butt Networks for your next digital project.",
    url: "https://buttnetworks.com", // Replace with your actual domain
    siteName: "Butt Networks",
    images: [
      {
        url: "/butt.png",
        width: 800,
        height: 600,
        alt: "Butt Networks Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Butt Networks | Professional Web Development Company",
    description:
      "Modern and scalable websites & apps built with the latest technologies. Partner with Butt Networks for your next digital project.",
    images: ["/butt.png"],
  },
  icons: {
    icon: "/butt.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

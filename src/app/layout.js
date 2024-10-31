import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingShape from "@/components/FloatingShape";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Car Rental Service | WeDrive",
  description: "Car Rental Software Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div
          className="min-h-screen bg-gradient-to-br from-blue-200 via-green-100 to-emerald-200 flex items-center justify-center relative overflow-hidden"
        >
          <FloatingShape color='bg-purple-600' size='w-64 h-64' top='-5%' left='10%' delay={0} />
          <FloatingShape color='bg-blue-600' size='w-48 h-48' top='70%' left='80%' delay={5} />
          <FloatingShape color='bg-red-600' size='w-32 h-32' top='40%' left='-10%' delay={2} />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

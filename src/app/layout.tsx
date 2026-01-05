import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Configuring Riviera Nights. 
// User must upload 'RivieraNights-Regular.woff2' and 'RivieraNights-Bold.woff2' to public/fonts/
// const riviera = localFont({
//   src: [
//     {
//       path: "../../public/fonts/RivieraNights-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/RivieraNights-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-riviera",
// });

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-riviera", // Keeping the variable name same to avoid changing global css
});

export const metadata: Metadata = {
  title: "High Table | The Exclusive UHNI Ecosystem",
  description: "A private ecosystem offering deal rooms, strategic alliances, and elite networking for Ultra-High-Net-Worth Individuals.",
  icons: {
    icon: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased bg-[#201B35] text-white overflow-x-hidden max-w-[100vw]`}
      >
        <div className="overflow-x-hidden w-full">
          
          {children}
         
        </div>
      </body>
    </html>
  );
}

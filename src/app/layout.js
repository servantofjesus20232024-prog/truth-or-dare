import { Playfair_Display, Montserrat, Rakkas } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const rakkas = Rakkas({ subsets: ["latin"], weight: "400", variable: "--font-rakkas" });

export const metadata = {
  title: "Truth or Dare",
  description: "A simple Truth or Dare game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} ${rakkas.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LetterHunter - Newsletter Analytics Dashboard",
  description: "Track and analyze media company newsletters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

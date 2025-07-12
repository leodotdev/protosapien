import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Protosapien",
  description: "AI Task Management Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <div className="Root">{children}</div>
      </body>
    </html>
  );
}

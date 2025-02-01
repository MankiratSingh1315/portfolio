import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mankirat Singh | Portfolio",
  description: "I am a 3rd year computer engineering student at Thapar Institute of Engineering and Technology, Patiala. I am a Full Stack Developer and love to code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        <link
          rel="icon"
          href="/logo.svg"
          type="image/svg+xml"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

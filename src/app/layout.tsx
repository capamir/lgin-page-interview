import "./globals.scss";

export const metadata = {
  title: "NextJS Auth App",
  description: "A simple NextJS app with login and dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
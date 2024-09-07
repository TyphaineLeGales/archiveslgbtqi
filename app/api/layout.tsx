export const metadata = {
  title: "Archives LGBTQI+",
  description: "Archives LGBTQI+",
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

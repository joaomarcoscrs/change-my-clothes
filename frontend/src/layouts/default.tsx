import "@fontsource/inter";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="dark text-foreground relative flex flex-col h-screen font-inter"
      style={{
        background: `
        linear-gradient(0deg, #111827, #111827),
        linear-gradient(192.05deg, rgba(103, 6, 206, 0) 0%, #3B2454 53.5%, rgba(41, 9, 76, 0.5) 100%)
      `,
      }}
    >
      <main className="container mx-auto max-w-7xl h-full">{children}</main>
    </div>
  );
}

import "@fontsource/inter";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="dark text-foreground relative flex flex-col h-screen font-inter bg-[#111827] bg-gradient-to-r from-transparent via-[#3B2454] to-[#29094C] w-screen h-screen"
    >
      <main className="container mx-auto max-w-7xl h-full">{children}</main>
    </div>
  );
}

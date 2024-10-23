import "@fontsource/inter";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark text-foreground relative flex flex-col h-screen font-inter bg-[#111827] bg-[linear-gradient(45deg,transparent,#3B2454,#29094C)] w-screen h-screen">
      <main className="container mx-auto max-w-7xl h-full">{children}</main>
    </div>
  );
}

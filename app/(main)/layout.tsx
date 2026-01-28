import { SidebarProvider, SidebarTrigger } from "@Components/ui/sidebar";
import Sidebar from "@Components/Sidebar";
import Navbar from "@Components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarTrigger className="md:hidden absolute top-2 left-2" />
      <main className="h-full w-full">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}

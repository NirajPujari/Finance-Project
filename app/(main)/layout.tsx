import { SidebarProvider, SidebarTrigger } from "@Components/ui/sidebar";
import Sidebar from "@Components/Sidebar";
import Navbar from "@Components/Navbar";
import { AuthProvider } from "@Context/Auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarTrigger className="md:hidden absolute top-3 left-3" />
        <main className="h-full w-full">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}

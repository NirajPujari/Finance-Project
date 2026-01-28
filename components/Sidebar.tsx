import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  PieChart,
  Settings,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Sidebar as ShadCnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@Components/ui/sidebar";
import Link from "next/link";

const items = [
  { icon: LayoutDashboard, title: "Dashboard", url: "/" },
  { icon: Wallet, title: "Transactions", url: "/transactions" },
  { icon: PieChart, title: "Budgets", url: "/budgets" },
  { icon: TrendingUp, title: "Investments", url: "/investments" },
  { icon: BarChart3, title: "Reports", url: "/reports" },
];

export default function Sidebar() {
  return (
    <ShadCnSidebar>
      <SidebarContent className="bg-black text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-2 w-full p-6 pb-4 border-b border-gray-500">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-sidebar-foreground">
                FinTrack
              </h1>
            </div>
            <SidebarMenu className="px-4 py-6 gap-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start gap-3 hover:bg-green-600 transition-all duration-300"
                  >
                    <Link href={item.url} className="font-bold">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-black text-white text-sm p-4 border-t border-gray-500">
        <Link href="/settings" className="font-bold flex gap-2">
          <button className="w-full flex gap-3 hover:bg-gray-800 transition-all duration-300 rounded-lg p-2 justify-start">
            <Settings className="mt-0.5 h-4 w-4" />
            <span>Settings</span>
          </button>
        </Link>
        <Link href="/logout" className="font-bold flex gap-2">
          <button className="w-full flex gap-3 hover:bg-red-800 transition-all duration-300 rounded-lg p-2 justify-start">
            <LogOut className="mt-0.5WASEDWQ Q h-4 w-4" />
            <span>Logout</span>
          </button>
        </Link>
      </SidebarFooter>
    </ShadCnSidebar>
  );
}

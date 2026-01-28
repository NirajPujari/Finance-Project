import AuthForm from "@Components/forms/Auth";
import { LineChart, Wallet, ShieldCheck } from "lucide-react";

export default function page() {
  const features = [
    {
      icon: LineChart,
      iconColor: "text-blue-500",
      title: "Track Spending",
      description:
        "Monitor your expenses in real-time with detailed categories and insights.",
    },
    {
      icon: Wallet,
      iconColor: "text-green-500",
      title: "Budget Planning",
      description:
        "Create personalized budgets to manage your finances effectively.",
    },
    {
      icon: ShieldCheck,
      iconColor: "text-purple-500",
      title: "Secure & Private",
      description:
        "Bank-level security keeps your financial data safe and encrypted",
    },
  ];
  return (
    <div className="min-h-screen bg-white flex text-black justify-center items-center">
      <div className="flex w-full max-w-6xl rounded-lg justify-center items-center">
        {/* Left side: Branding (hidden on mobile) */}
        <section className="w-full flex flex-col gap-6">
          <div className="hidden md:flex w-full flex-col gap-12">
            <header className="flex flex-col gap-4 justify-start items-start">
              <div className="flex justify-center items-center gap-4 font-bold">
                <div className="py-1 px-3 text-xl bg-black text-white rounded-lg">
                  ₹
                </div>
                <h1 className="text-2xl">FinTrack</h1>
              </div>
              <p className="text-gray-500 font-medium text-lg">
                Manage your money, secure your future
              </p>
            </header>
            <div className="flex flex-col justify-start items-start gap-4">
              {features.map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <div
                    className={`py-2 px-3 text-xl ${item.iconColor} rounded-lg`}
                  >
                    <item.icon className="size-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-b border-b-gray-800/50"></div>
          </div>
          <footer className="flex flex-col gap-3 justify-start items-start">
            <p className="text-gray-500 text-sm">Trusted by millions worldwide</p>
            <div className="flex gap-2">
              <p className="bg-gray-200 py-2 px-3 rounded-xl text-xs text-black font-bold">⭐ 4.9</p>
              <p className="bg-gray-200 py-2 px-3 rounded-xl text-xs text-black font-bold">50k+</p>
              <p className="bg-gray-200 py-2 px-3 rounded-xl text-xs text-black font-bold">24/7</p>
            </div>
          </footer>
        </section>

        {/* Right side: Auth form */}
        <section className="w-full flex justify-center items-center">
          <AuthForm />
        </section>
      </div>
    </div>
  );
}

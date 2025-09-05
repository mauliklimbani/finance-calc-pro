import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { createPageUrl } from "../utils";
import { 
  Calculator, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  BarChart3,
  Home,
  Repeat,
  Menu,
  X
} from "lucide-react";
import { Button } from "../components/ui/button";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
    category: "Main"
  },
  {
    title: "EMI Calculator",
    url: createPageUrl("EMICalculator"),
    icon: Calculator,
    category: "Loans"
  },
  {
    title: "Loan Eligibility",
    url: createPageUrl("LoanEligibility"),
    icon: CreditCard,
    category: "Loans"
  },
  {
    title: "Fixed Deposit",
    url: createPageUrl("FDCalculator"),
    icon: Wallet,
    category: "Investments"
  },
  {
    title: "Recurring Deposit",
    url: createPageUrl("RDCalculator"),
    icon: Repeat,
    category: "Investments"
  },
  {
    title: "SIP Calculator",
    url: createPageUrl("SIPCalculator"),
    icon: TrendingUp,
    category: "Investments"
  },
  {
    title: "CAGR Calculator",
    url: createPageUrl("CAGRCalculator"),
    icon: BarChart3,
    category: "Analysis"
  }
];

export default function Layout({ children, currentPageName }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <style>{`
        :root {
          --primary: #0F172A;
          --accent: #F59E0B;
          --gold: #FCD34D;
          --navy: #1E293B;
          --soft-gray: #F8FAFC;
        }
      `}</style>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href={createPageUrl("Home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              FinanceCalc Pro
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-600 hover:text-slate-800"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-xl 
          border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-3 px-6 py-8 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                FinanceCalc Pro
              </h1>
              <p className="text-xs text-slate-500 font-medium">Premium Financial Tools</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-4 py-6 space-y-8">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
                  {category}
                </h3>
                <nav className="space-y-1">
                  {items.map((item) => {
                    const isActive = router.pathname === item.url;
                    return (
                      <Link
                        key={item.title}
                        href={item.url}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                          transition-all duration-200 group relative overflow-hidden
                          ${isActive 
                            ? 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900 shadow-sm' 
                            : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                          }
                        `}
                      >
                        <div className={`
                          p-1.5 rounded-lg transition-colors
                          ${isActive 
                            ? 'bg-amber-200/50 text-amber-700' 
                            : 'text-slate-400 group-hover:text-slate-600'
                          }
                        `}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="flex-1">{item.title}</span>
                        {isActive && (
                          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-l-full" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          {/* Footer */}
          {/* <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-slate-400 font-medium">
                Made with precision & care
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          </div> */}
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className=" mx-auto px-4 py-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

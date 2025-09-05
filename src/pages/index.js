import React from "react";
import Link from "next/link";
import { createPageUrl } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Calculator, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  BarChart3,
  Repeat,
  ArrowRight,
  Star,
  Users,
  Award
} from "lucide-react";

const calculators = [
  {
    title: "EMI Calculator",
    description: "Calculate monthly loan payments with detailed amortization schedule",
    icon: Calculator,
    url: "EMICalculator",
    color: "from-blue-500 to-blue-600",
    popular: true
  },
  {
    title: "Fixed Deposit Calculator",
    description: "Calculate FD maturity amount with compound interest",
    icon: Wallet,
    url: "FDCalculator",
    color: "from-green-500 to-green-600"
  },
  {
    title: "SIP Calculator", 
    description: "Calculate mutual fund SIP returns and wealth creation",
    icon: TrendingUp,
    url: "SIPCalculator",
    color: "from-purple-500 to-purple-600",
    popular: true
  },
  {
    title: "Loan Eligibility",
    description: "Check your maximum loan eligibility based on income",
    icon: CreditCard,
    url: "LoanEligibility", 
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Recurring Deposit",
    description: "Calculate RD maturity with monthly deposits",
    icon: Repeat,
    url: "RDCalculator",
    color: "from-teal-500 to-teal-600"
  },
  {
    title: "CAGR Calculator",
    description: "Calculate Compound Annual Growth Rate of investments",
    icon: BarChart3,
    url: "CAGRCalculator",
    color: "from-indigo-500 to-indigo-600"
  }
];

const features = [
  {
    icon: Star,
    title: "Accurate Calculations",
    description: "Industry-standard formulas with precision to the last decimal"
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Over 50,000 calculations performed by finance professionals"
  },
  {
    icon: Award,
    title: "Award-Winning Design",
    description: "Beautiful, intuitive interface designed for clarity"
  }
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-blue-500/20 blur-3xl -z-10" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent leading-tight">
            Premium Financial<br />
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
              Calculator Suite
            </span>
          </h1>
        </div>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Professional-grade financial calculators with precision, beautiful design, and comprehensive analysis. 
          Make informed financial decisions with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href={createPageUrl("EMICalculator")}>
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-200">
              Start Calculating
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="cursor-pointer">
            View All Tools
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="text-center bg-white/60 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Calculator Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-800">Financial Calculators</h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Choose from our comprehensive suite of calculators, each designed with precision and clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc, index) => (
            <Link key={index} href={createPageUrl(calc.url)} className="group">
              <Card className="h-full bg-white/60 backdrop-blur-sm border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                {calc.popular && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${calc.color} opacity-5 rounded-full transform translate-x-8 -translate-y-8`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${calc.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                      <calc.icon className={`w-6 h-6 text-white-600`} />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                    {calc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed mb-4">{calc.description}</p>
                  <div className="flex items-center text-sm font-medium text-amber-600 group-hover:text-amber-700 transition-colors">
                    Calculate Now
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-12 space-y-6">
        <h3 className="text-2xl font-bold text-slate-800">Ready to Take Control of Your Finances?</h3>
        <p className="text-slate-600 max-w-xl mx-auto">
          Start with our most popular EMI calculator and discover the power of precise financial planning.
        </p>
        <Link href={createPageUrl("EMICalculator")}>
          <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-200">
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

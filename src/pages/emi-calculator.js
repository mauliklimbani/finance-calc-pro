import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calculator, Download, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

import CurrencyField from "../components/ui/CurrencyField";
import PercentField from "../components/ui/PercentField";
import NumberField from "../components/ui/NumberField";
import ResultCard from "../components/ui/ResultCard";
import ScheduleTable from "../components/ui/ScheduleTable";

import { calculateEMI, generateAmortizationSchedule } from "../components/lib/finance";

export default function EMICalculator() {
  const [inputs, setInputs] = useState({
    principal: 1000000,
    rate: 8.5,
    tenure: 10,
    prepayment: 0
  });

  const [results, setResults] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const updateInput = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = useCallback(() => {
    if (!inputs.principal || !inputs.rate || !inputs.tenure) return;

    const emi = calculateEMI(inputs.principal, inputs.rate, inputs.tenure);
    const scheduleData = generateAmortizationSchedule(
      inputs.principal, 
      inputs.rate, 
      inputs.tenure, 
      inputs.prepayment
    );

    setResults({
      emi,
      totalInterest: scheduleData.totalInterest,
      totalPayment: scheduleData.totalPayment,
      actualTenure: scheduleData.actualTenure
    });

    setSchedule(scheduleData.schedule);
  }, [inputs]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const interestSaved = inputs.prepayment > 0 && results ? 
    (inputs.principal * inputs.rate / 100 * inputs.tenure) - results.totalInterest : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">EMI Calculator</h1>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Calculate your monthly loan payments with detailed amortization schedule and prepayment analysis.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CurrencyField
                label="Loan Amount"
                value={inputs.principal}
                onChange={(val) => updateInput('principal', val)}
                required
              />
              
              <PercentField
                label="Annual Interest Rate"
                value={inputs.rate}
                onChange={(val) => updateInput('rate', val)}
                required
                step={0.1}
                max={30}
              />
              
              <NumberField
                label="Loan Tenure"
                value={inputs.tenure}
                onChange={(val) => updateInput('tenure', val)}
                suffix="years"
                required
                min={1}
                max={30}
              />
              
              <CurrencyField
                label="Prepayment Amount (Optional)"
                value={inputs.prepayment}
                onChange={(val) => updateInput('prepayment', val)}
              />

              <Button 
                onClick={calculate}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                Calculate EMI
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {results && (
            <>
              {/* Key Results */}
              <div className="grid sm:grid-cols-2 gap-4">
                <ResultCard
                  title="Monthly EMI"
                  value={results.emi}
                  type="currency"
                  icon={Calculator}
                  gradient="from-indigo-500 to-indigo-600"
                />
                <ResultCard
                  title="Total Interest"
                  value={results.totalInterest}
                  type="currency"
                  gradient="from-red-500 to-red-600"
                />
                <ResultCard
                  title="Total Payment"
                  value={results.totalPayment}
                  type="currency"
                  gradient="from-purple-500 to-purple-600"
                />
                <ResultCard
                  title={inputs.prepayment > 0 ? "Interest Saved" : "Actual Tenure"}
                  value={inputs.prepayment > 0 ? interestSaved : results.actualTenure}
                  type={inputs.prepayment > 0 ? "currency" : "number"}
                  subtitle={inputs.prepayment > 0 ? "with prepayment" : "months"}
                  gradient="from-green-500 to-green-600"
                />
              </div>

              {/* Detailed Analysis */}
              <Tabs defaultValue="schedule" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="schedule">Amortization Schedule</TabsTrigger>
                  <TabsTrigger value="summary">Payment Summary</TabsTrigger>
                </TabsList>

                <TabsContent value="schedule">
                  <ScheduleTable schedule={schedule} />
                </TabsContent>

                <TabsContent value="summary">
                  <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            Loan Summary
                          </h3>
                          <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-lg">
                              <span className="text-slate-600 font-medium">Principal Amount</span>
                              <span className="font-semibold text-slate-800">₹{inputs.principal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-lg">
                              <span className="text-slate-600 font-medium">Interest Rate</span>
                              <span className="font-semibold text-slate-800">{inputs.rate}% p.a.</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-lg">
                              <span className="text-slate-600 font-medium">Loan Tenure</span>
                              <span className="font-semibold text-slate-800">{inputs.tenure} years</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-indigo-50/50 rounded-lg border-t border-indigo-200/50">
                              <span className="text-slate-600 font-medium">Monthly EMI</span>
                              <span className="font-bold text-indigo-600">₹{results.emi.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            Payment Breakdown
                          </h3>
                          <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-center p-3 bg-red-50/50 rounded-lg">
                              <span className="text-slate-600 font-medium">Total Interest</span>
                              <span className="font-semibold text-red-600">₹{results.totalInterest.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-lg">
                              <span className="text-slate-600 font-medium">Total Payment</span>
                              <span className="font-semibold text-slate-800">₹{results.totalPayment.toLocaleString()}</span>
                            </div>
                            {inputs.prepayment > 0 && (
                              <div className="flex justify-between items-center p-3 bg-green-50/50 rounded-lg">
                                <span className="text-slate-600 font-medium">Interest Saved</span>
                                <span className="font-semibold text-green-600">₹{interestSaved.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between items-center p-3 bg-amber-50/50 rounded-lg border-t border-amber-200/50">
                              <span className="text-slate-600 font-medium">Interest to Principal Ratio</span>
                              <span className="font-bold text-amber-600">{(results.totalInterest / inputs.principal * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
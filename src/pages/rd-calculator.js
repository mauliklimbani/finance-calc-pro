import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Repeat } from "lucide-react";
import { motion } from "framer-motion";

import CurrencyField from "../components/ui/CurrencyField";
import PercentField from "../components/ui/PercentField";
import NumberField from "../components/ui/NumberField";
import ResultCard from "../components/ui/ResultCard";

import { calculateRD } from "../components/lib/finance";
import { createRDCalculation } from "../lib/calculation";

export default function RDCalculator() {
  const [inputs, setInputs] = useState({
    monthlyDeposit: 5000,
    rate: 6.5,
    tenure: 1
  });

  const [results, setResults] = useState(null);
  const [calculation, setCalculation] = useState(null);

  const updateInput = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = useCallback(() => {
    if (!inputs.monthlyDeposit || !inputs.rate || !inputs.tenure) return;

    const resultsData = calculateRD(inputs.monthlyDeposit, inputs.rate, inputs.tenure);
    setResults(resultsData);

    // Create Calculation entity
    const calc = createRDCalculation(inputs, resultsData, 'INR');
    setCalculation(calc);
  }, [inputs]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <Repeat className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Recurring Deposit Calculator</h1>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Calculate your RD maturity amount with monthly deposits and compound interest.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">RD Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CurrencyField
                label="Monthly Deposit"
                value={inputs.monthlyDeposit}
                onChange={(val) => updateInput('monthlyDeposit', val)}
                required
              />
              
              <PercentField
                label="Annual Interest Rate"
                value={inputs.rate}
                onChange={(val) => updateInput('rate', val)}
                required
                step={0.1}
                max={15}
              />
              
              <NumberField
                label="Tenure"
                value={inputs.tenure}
                onChange={(val) => updateInput('tenure', val)}
                suffix="years"
                required
                min={0.5}
                max={10}
                step={0.5}
              />

              <Button 
                onClick={calculate}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                size="lg"
              >
                Calculate RD
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
                  title="Maturity Amount"
                  value={results.maturityAmount}
                  type="currency"
                  icon={Repeat}
                  gradient="from-teal-500 to-teal-600"
                />
                <ResultCard
                  title="Interest Earned"
                  value={results.interestEarned}
                  type="currency"
                  gradient="from-blue-500 to-blue-600"
                />
                <ResultCard
                  title="Total Investment"
                  value={results.totalInvestment}
                  type="currency"
                  gradient="from-purple-500 to-purple-600"
                />
                <ResultCard
                  title="Return on Investment"
                  value={(results.interestEarned / results.totalInvestment * 100)}
                  type="percent"
                  gradient="from-amber-500 to-amber-600"
                />
              </div>

              {/* Summary */}
              <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">RD Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Monthly Deposit</span>
                          <span className="font-medium text-[#09090B]">₹{inputs.monthlyDeposit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Interest Rate</span>
                          <span className="font-medium text-[#09090B]">{inputs.rate}% p.a.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Tenure</span>
                          <span className="font-medium text-[#09090B]">{inputs.tenure} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Deposits</span>
                          <span className="font-medium text-[#09090B]">{inputs.tenure * 12} months</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Returns</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Investment</span>
                          <span className="font-medium text-[#09090B]">₹{results.totalInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Interest Earned</span>
                          <span className="font-medium text-[#09090B]">₹{results.interestEarned.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Maturity Amount</span>
                          <span className="font-medium text-[#09090B]">₹{results.maturityAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-3">
                          <span className="text-slate-600">ROI</span>
                          <span className="font-bold text-green-600">
                            {(results.interestEarned / results.totalInvestment * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

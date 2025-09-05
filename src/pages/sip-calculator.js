import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import CurrencyField from "../components/ui/CurrencyField";
import PercentField from "../components/ui/PercentField";
import NumberField from "../components/ui/NumberField";
import ResultCard from "../components/ui/ResultCard";

import { calculateSIP } from "../components/lib/finance";
import { createSIPCalculation } from "../lib/calculation";

export default function SIPCalculator() {
  const [inputs, setInputs] = useState({
    monthlyInvestment: 5000,
    expectedReturn: 12,
    tenure: 10,
    stepUp: 10
  });

  const [results, setResults] = useState(null);
  const [calculation, setCalculation] = useState(null);

  const updateInput = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = useCallback(() => {
    if (!inputs.monthlyInvestment || !inputs.expectedReturn || !inputs.tenure) return;

    const resultsData = calculateSIP(inputs.monthlyInvestment, inputs.expectedReturn, inputs.tenure, inputs.stepUp);
    setResults(resultsData);

    // Create Calculation entity
    const calc = createSIPCalculation(inputs, resultsData, 'INR');
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
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">SIP Calculator</h1>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Calculate your mutual fund SIP returns and wealth creation with step-up investments.
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
              <CardTitle className="text-lg font-semibold text-slate-800">SIP Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CurrencyField
                label="Monthly Investment"
                value={inputs.monthlyInvestment}
                onChange={(val) => updateInput('monthlyInvestment', val)}
                required
              />
              
              <PercentField
                label="Expected Annual Return"
                value={inputs.expectedReturn}
                onChange={(val) => updateInput('expectedReturn', val)}
                required
                step={0.5}
                max={25}
              />
              
              <NumberField
                label="Investment Period"
                value={inputs.tenure}
                onChange={(val) => updateInput('tenure', val)}
                suffix="years"
                required
                min={1}
                max={30}
              />
              
              <PercentField
                label="Annual Step-up %"
                value={inputs.stepUp}
                onChange={(val) => updateInput('stepUp', val)}
                step={1}
                max={50}
              />

              <Button 
                onClick={calculate}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                size="lg"
              >
                Calculate SIP
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
                  title="Future Value"
                  value={results.futureValue}
                  type="currency"
                  icon={TrendingUp}
                  gradient="from-purple-500 to-purple-600"
                />
                <ResultCard
                  title="Total Investment"
                  value={results.totalInvestment}
                  type="currency"
                  gradient="from-blue-500 to-blue-600"
                />
                <ResultCard
                  title="Wealth Gain"
                  value={results.wealthGain}
                  type="currency"
                  gradient="from-green-500 to-green-600"
                />
                <ResultCard
                  title="Return on Investment"
                  value={(results.wealthGain / results.totalInvestment * 100)}
                  type="percent"
                  gradient="from-amber-500 to-amber-600"
                />
              </div>

              {/* Summary */}
              <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">SIP Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Monthly Investment</span>
                          <span className="font-medium text-[#09090B]"> ₹{inputs.monthlyInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Expected Return</span>
                          <span className="font-medium text-[#09090B]">{inputs.expectedReturn}% p.a.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Investment Period</span>
                          <span className="font-medium text-[#09090B]">{inputs.tenure} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Annual Step-up</span>
                          <span className="font-medium text-[#09090B]">{inputs.stepUp}%</span>
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
                          <span className="text-slate-600">Wealth Gain</span>
                          <span className="font-medium text-[#09090B]">₹{results.wealthGain.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Future Value</span>
                          <span className="font-medium text-[#09090B]">₹{results.futureValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-3">
                          <span className="text-slate-600">ROI</span>
                            <span className="font-bold text-green-600">
                            {(results.wealthGain / results.totalInvestment * 100).toFixed(2)}%
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

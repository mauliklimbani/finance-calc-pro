import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

import CurrencyField from "../components/ui/CurrencyField";
import NumberField from "../components/ui/NumberField";
import ResultCard from "../components/ui/ResultCard";

import { calculateCAGR } from "../components/lib/finance";
import { createCAGRCalculation } from "../lib/calculation";

export default function CAGRCalculator() {
  const [inputs, setInputs] = useState({
    initialValue: 100000,
    finalValue: 200000,
    years: 5
  });

  const [results, setResults] = useState(null);
  const [calculation, setCalculation] = useState(null);

  const updateInput = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = useCallback(() => {
    if (!inputs.initialValue || !inputs.finalValue || !inputs.years) return;

    const cagr = calculateCAGR(inputs.initialValue, inputs.finalValue, inputs.years);
    const resultsData = {
      cagr,
      totalReturn: inputs.finalValue - inputs.initialValue,
      totalReturnPercent: ((inputs.finalValue - inputs.initialValue) / inputs.initialValue * 100)
    };
    
    setResults(resultsData);

    // Create Calculation entity
    const calc = createCAGRCalculation(inputs, resultsData, 'INR');
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
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">CAGR Calculator</h1>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Calculate Compound Annual Growth Rate of your investments and analyze performance.
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
              <CardTitle className="text-lg font-semibold text-slate-800">Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CurrencyField
                label="Initial Investment"
                value={inputs.initialValue}
                onChange={(val) => updateInput('initialValue', val)}
                required
              />
              
              <CurrencyField
                label="Final Value"
                value={inputs.finalValue}
                onChange={(val) => updateInput('finalValue', val)}
                required
              />
              
              <NumberField
                label="Investment Period"
                value={inputs.years}
                onChange={(val) => updateInput('years', val)}
                suffix="years"
                required
                min={0.1}
                max={50}
                step={0.1}
              />

              <Button 
                onClick={calculate}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                size="lg"
              >
                Calculate CAGR
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
                  title="CAGR"
                  value={results.cagr}
                  type="percent"
                  icon={BarChart3}
                  gradient="from-indigo-500 to-indigo-600"
                />
                <ResultCard
                  title="Total Return"
                  value={results.totalReturn}
                  type="currency"
                  gradient="from-green-500 to-green-600"
                />
                <ResultCard
                  title="Total Return %"
                  value={results.totalReturnPercent}
                  type="percent"
                  gradient="from-blue-500 to-blue-600"
                />
                <ResultCard
                  title="Investment Multiplier"
                  value={inputs.finalValue / inputs.initialValue}
                  type="number"
                  subtitle="times"
                  gradient="from-amber-500 to-amber-600"
                />
              </div>

              {/* Summary */}
              <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Investment Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Initial Investment</span>
                          <span className="font-mediu text-[#09090B]">₹{inputs.initialValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Final Value</span>
                          <span className="font-medium text-[#09090B]">₹{inputs.finalValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Investment Period</span>
                          <span className="font-medium text-[#09090B]">{inputs.years} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Investment Multiplier</span>
                          <span className="font-medium text-[#09090B]">{(inputs.finalValue / inputs.initialValue).toFixed(2)}x</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Performance</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Return</span>
                          <span className="font-medium text-[#09090B]">₹{results.totalReturn.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Return %</span>
                          <span className="font-medium text-[#09090B]">{results.totalReturnPercent.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">CAGR</span>
                          <span className="font-medium text-[#09090B]">{results.cagr}%</span>
                        </div>
                        <div className="flex justify-between border-t pt-3">
                          <span className="text-slate-600">Annualized Growth</span>
                          <span className="font-bold text-green-600">
                            {results.cagr}% p.a.
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

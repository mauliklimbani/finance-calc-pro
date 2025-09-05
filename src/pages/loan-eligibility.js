import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CreditCard } from "lucide-react";
import { motion } from "framer-motion";

import CurrencyField from "../components/ui/CurrencyField";
import PercentField from "../components/ui/PercentField";
import NumberField from "../components/ui/NumberField";
import ResultCard from "../components/ui/ResultCard";

import { calculateLoanEligibility } from "../components/lib/finance";
import { createLoanEligibilityCalculation } from "../lib/calculation";

export default function LoanEligibilityCalculator() {
  const [inputs, setInputs] = useState({
    monthlyIncome: 50000,
    existingEmi: 0,
    foir: 40,
    rate: 8.5,
    tenure: 20
  });

  const [results, setResults] = useState(null);
  const [calculation, setCalculation] = useState(null);

  const updateInput = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = useCallback(() => {
    if (!inputs.monthlyIncome || !inputs.rate || !inputs.tenure) return;

    const resultsData = calculateLoanEligibility(
      inputs.monthlyIncome, 
      inputs.existingEmi, 
      inputs.foir, 
      inputs.rate, 
      inputs.tenure
    );
    setResults(resultsData);

    // Create Calculation entity
    const calc = createLoanEligibilityCalculation(inputs, resultsData, 'INR');
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
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Loan Eligibility Calculator</h1>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Check your maximum loan eligibility based on income, existing EMIs, and FOIR ratio.
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
              <CardTitle className="text-lg font-semibold text-slate-800">Income Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CurrencyField
                label="Monthly Net Income"
                value={inputs.monthlyIncome}
                onChange={(val) => updateInput('monthlyIncome', val)}
                required
              />
              
              <CurrencyField
                label="Existing EMIs"
                value={inputs.existingEmi}
                onChange={(val) => updateInput('existingEmi', val)}
              />
              
              <PercentField
                label="FOIR %"
                value={inputs.foir}
                onChange={(val) => updateInput('foir', val)}
                required
                step={5}
                max={70}
              />
              
              <PercentField
                label="Interest Rate"
                value={inputs.rate}
                onChange={(val) => updateInput('rate', val)}
                required
                step={0.1}
                max={20}
              />
              
              <NumberField
                label="Loan Tenure"
                value={inputs.tenure}
                onChange={(val) => updateInput('tenure', val)}
                suffix="years"
                required
                min={5}
                max={30}
              />

              <Button 
                onClick={calculate}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                size="lg"
              >
                Check Eligibility
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
                  title="Maximum EMI"
                  value={results.maxEmi}
                  type="currency"
                  icon={CreditCard}
                  gradient="from-orange-500 to-orange-600"
                />
                <ResultCard
                  title="Maximum Loan Amount"
                  value={results.maxLoanAmount}
                  type="currency"
                  gradient="from-green-500 to-green-600"
                />
                <ResultCard
                  title="Available for EMI"
                  value={(inputs.monthlyIncome * inputs.foir / 100) - inputs.existingEmi}
                  type="currency"
                  gradient="from-blue-500 to-blue-600"
                />
                <ResultCard
                  title="FOIR Utilization"
                  value={((results.maxEmi + inputs.existingEmi) / inputs.monthlyIncome * 100)}
                  type="percent"
                  gradient="from-purple-500 to-purple-600"
                />
              </div>

              {/* Summary */}
              <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Income Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Monthly Income</span>
                          <span className="font-medium text-[#09090B]">₹{inputs.monthlyIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Existing EMIs</span>
                          <span className="font-medium text-[#09090B]">₹{inputs.existingEmi.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">FOIR Limit</span>
                          <span className="font-medium text-[#09090B]">{inputs.foir}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Available for EMI</span>
                          <span className="font-medium text-green-600">
                            ₹{((inputs.monthlyIncome * inputs.foir / 100) - inputs.existingEmi).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Loan Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Interest Rate</span>
                          <span className="font-medium text-[#09090B]">{inputs.rate}% p.a.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Loan Tenure</span>
                          <span className="font-medium text-[#09090B]">{inputs.tenure} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Maximum EMI</span>
                          <span className="font-medium text-[#09090B]">₹{results.maxEmi.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-3">
                          <span className="text-slate-600">Maximum Loan</span>
                          <span className="font-bold text-green-600">₹{results.maxLoanAmount.toLocaleString()}</span>
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

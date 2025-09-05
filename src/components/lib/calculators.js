// Financial Calculator Registry
export const calculatorRegistry = {
    'emi': {
      title: 'EMI Calculator',
      description: 'Calculate monthly loan payments with detailed amortization schedule',
      icon: 'Calculator',
      category: 'Loans',
      inputs: {
        principal: { type: 'currency', label: 'Loan Amount', required: true },
        rate: { type: 'percent', label: 'Annual Interest Rate', required: true },
        tenure: { type: 'number', label: 'Loan Tenure (Years)', required: true },
        prepayment: { type: 'currency', label: 'Prepayment Amount', required: false },
        prepaymentType: { type: 'select', label: 'Prepayment Type', options: ['one-time', 'recurring'], required: false }
      }
    },
    'fd': {
      title: 'Fixed Deposit Calculator',
      description: 'Calculate FD maturity amount with compound interest',
      icon: 'Wallet',
      category: 'Investments',
      inputs: {
        principal: { type: 'currency', label: 'Deposit Amount', required: true },
        rate: { type: 'percent', label: 'Annual Interest Rate', required: true },
        tenure: { type: 'number', label: 'Tenure (Years)', required: true },
        compounding: { type: 'select', label: 'Compounding', options: ['monthly', 'quarterly', 'half-yearly', 'annual'], required: true }
      }
    },
    'rd': {
      title: 'Recurring Deposit Calculator', 
      description: 'Calculate RD maturity with monthly deposits',
      icon: 'Repeat',
      category: 'Investments',
      inputs: {
        monthlyDeposit: { type: 'currency', label: 'Monthly Deposit', required: true },
        rate: { type: 'percent', label: 'Annual Interest Rate', required: true },
        tenure: { type: 'number', label: 'Tenure (Years)', required: true }
      }
    },
    'sip': {
      title: 'SIP Calculator',
      description: 'Calculate mutual fund SIP returns and wealth creation',
      icon: 'TrendingUp',
      category: 'Investments',
      inputs: {
        monthlyInvestment: { type: 'currency', label: 'Monthly Investment', required: true },
        expectedReturn: { type: 'percent', label: 'Expected Annual Return', required: true },
        tenure: { type: 'number', label: 'Investment Period (Years)', required: true },
        stepUp: { type: 'percent', label: 'Annual Step-up %', required: false }
      }
    },
    'loan-eligibility': {
      title: 'Loan Eligibility Calculator',
      description: 'Check your maximum loan eligibility based on income',
      icon: 'CreditCard',
      category: 'Loans',
      inputs: {
        monthlyIncome: { type: 'currency', label: 'Monthly Net Income', required: true },
        existingEmi: { type: 'currency', label: 'Existing EMIs', required: false },
        foir: { type: 'percent', label: 'FOIR %', defaultValue: 40, required: true },
        rate: { type: 'percent', label: 'Interest Rate', required: true },
        tenure: { type: 'number', label: 'Loan Tenure (Years)', required: true }
      }
    },
    'cagr': {
      title: 'CAGR Calculator',
      description: 'Calculate Compound Annual Growth Rate of investments',
      icon: 'BarChart3',
      category: 'Analysis',
      inputs: {
        initialValue: { type: 'currency', label: 'Initial Investment', required: true },
        finalValue: { type: 'currency', label: 'Final Value', required: true },
        years: { type: 'number', label: 'Investment Period (Years)', required: true }
      }
    }
  };
  
  export const getCalculatorBySlug = (slug) => {
    return calculatorRegistry[slug] || null;
  };
  
  export const getAllCalculators = () => {
    return Object.entries(calculatorRegistry).map(([slug, config]) => ({
      slug,
      ...config
    }));
  };
// Financial calculation formulas

export const calculateEMI = (principal, annualRate, tenureYears) => {
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    
    if (monthlyRate === 0) {
      return principal / totalMonths;
    }
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    return Math.round(emi * 100) / 100;
  };
  
  export const generateAmortizationSchedule = (principal, annualRate, tenureYears, prepayment = 0) => {
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    const emi = calculateEMI(principal, annualRate, tenureYears);
    
    const schedule = [];
    let balance = principal;
    let totalInterest = 0;
    let totalPrincipal = 0;
    
    for (let month = 1; month <= totalMonths && balance > 0; month++) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = emi - interestPayment;
      
      // Handle prepayment in first month
      if (month === 1 && prepayment > 0) {
        principalPayment += prepayment;
      }
      
      if (principalPayment > balance) {
        principalPayment = balance;
      }
      
      balance -= principalPayment;
      totalInterest += interestPayment;
      totalPrincipal += principalPayment;
      
      schedule.push({
        month,
        openingBalance: balance + principalPayment,
        emiPayment: month === 1 && prepayment > 0 ? emi + prepayment : emi,
        interestPayment: Math.round(interestPayment * 100) / 100,
        principalPayment: Math.round(principalPayment * 100) / 100,
        closingBalance: Math.round(balance * 100) / 100
      });
    }
    
    return {
      schedule,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayment: Math.round((totalPrincipal + totalInterest) * 100) / 100,
      actualTenure: schedule.length
    };
  };
  
  export const calculateFD = (principal, annualRate, tenureYears, compounding = 'quarterly') => {
    const rate = annualRate / 100;
    const compoundingPeriods = {
      'monthly': 12,
      'quarterly': 4,
      'half-yearly': 2,
      'annual': 1
    };
    
    const n = compoundingPeriods[compounding];
    const t = tenureYears;
    
    const maturityAmount = principal * Math.pow(1 + rate / n, n * t);
    const interestEarned = maturityAmount - principal;
    
    return {
      maturityAmount: Math.round(maturityAmount * 100) / 100,
      interestEarned: Math.round(interestEarned * 100) / 100,
      totalInvestment: principal
    };
  };
  
  export const calculateRD = (monthlyDeposit, annualRate, tenureYears) => {
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    
    // RD formula: FV of ordinary annuity
    let maturityAmount = 0;
    for (let month = 0; month < totalMonths; month++) {
      const remainingMonths = totalMonths - month;
      maturityAmount += monthlyDeposit * Math.pow(1 + monthlyRate, remainingMonths);
    }
    
    const totalInvestment = monthlyDeposit * totalMonths;
    const interestEarned = maturityAmount - totalInvestment;
    
    return {
      maturityAmount: Math.round(maturityAmount * 100) / 100,
      interestEarned: Math.round(interestEarned * 100) / 100,
      totalInvestment
    };
  };
  
  export const calculateSIP = (monthlyInvestment, expectedReturnPercent, tenureYears, stepUpPercent = 0) => {
    const monthlyRate = expectedReturnPercent / 12 / 100;
    const totalMonths = tenureYears * 12;
    
    let futureValue = 0;
    let totalInvestment = 0;
    let currentMonthlyInvestment = monthlyInvestment;
    
    for (let month = 1; month <= totalMonths; month++) {
      // Apply step-up annually
      if (stepUpPercent > 0 && month > 12 && (month - 1) % 12 === 0) {
        currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpPercent / 100);
      }
      
      const remainingMonths = totalMonths - month + 1;
      futureValue += currentMonthlyInvestment * Math.pow(1 + monthlyRate, remainingMonths - 1);
      totalInvestment += currentMonthlyInvestment;
    }
    
    const wealthGain = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue * 100) / 100,
      totalInvestment: Math.round(totalInvestment * 100) / 100,
      wealthGain: Math.round(wealthGain * 100) / 100
    };
  };
  
  export const calculateLoanEligibility = (monthlyIncome, existingEmi = 0, foirPercent = 40, annualRate, tenureYears) => {
    const maxEmi = (monthlyIncome * foirPercent / 100) - existingEmi;
    
    if (maxEmi <= 0) {
      return { maxEmi: 0, maxLoanAmount: 0 };
    }
    
    // Reverse EMI calculation to get principal
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    
    const maxLoanAmount = maxEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1) / 
                         (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
    
    return {
      maxEmi: Math.round(maxEmi * 100) / 100,
      maxLoanAmount: Math.round(maxLoanAmount * 100) / 100
    };
  };
  
  export const calculateCAGR = (initialValue, finalValue, years) => {
    const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
    return Math.round(cagr * 100) / 100;
  };
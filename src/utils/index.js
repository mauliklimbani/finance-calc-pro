// Utility functions for the application

export const createPageUrl = (pageName) => {
  const pageMap = {
    'Home': '/',
    'EMICalculator': '/emi-calculator',
    'FDCalculator': '/fd-calculator',
    'SIPCalculator': '/sip-calculator',
    'LoanEligibility': '/loan-eligibility',
    'RDCalculator': '/rd-calculator',
    'CAGRCalculator': '/cagr-calculator'
  };
  
  return pageMap[pageName] || `/${pageName.toLowerCase()}`;
};

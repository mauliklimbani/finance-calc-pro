// Calculation entity structure as specified

export class Calculation {
  constructor(calculatorType, inputs, results, currency = 'INR') {
    this.calculator_type = calculatorType;
    this.inputs = inputs;
    this.results = results;
    this.currency = currency;
    
    // Validate required fields
    if (!this.calculator_type || !this.inputs || !this.results) {
      throw new Error('Missing required fields: calculator_type, inputs, and results are required');
    }
    
    // Validate currency
    const validCurrencies = ['INR', 'USD', 'EUR', 'GBP'];
    if (!validCurrencies.includes(this.currency)) {
      throw new Error(`Invalid currency. Must be one of: ${validCurrencies.join(', ')}`);
    }
  }
  
  // Get calculation summary
  getSummary() {
    return {
      type: this.calculator_type,
      currency: this.currency,
      inputCount: Object.keys(this.inputs).length,
      resultCount: Object.keys(this.results).length,
      timestamp: new Date().toISOString()
    };
  }
  
  // Convert to JSON
  toJSON() {
    return {
      calculator_type: this.calculator_type,
      inputs: this.inputs,
      results: this.results,
      currency: this.currency
    };
  }
  
  // Create from JSON
  static fromJSON(data) {
    return new Calculation(
      data.calculator_type,
      data.inputs,
      data.results,
      data.currency
    );
  }
}

// Factory functions for different calculator types
export const createEMICalculation = (inputs, results, currency = 'INR') => {
  return new Calculation('emi', inputs, results, currency);
};

export const createFDCalculation = (inputs, results, currency = 'INR') => {
  return new Calculation('fd', inputs, results, currency);
};

export const createSIPCalculation = (inputs, results, currency = 'INR') => {
  return new Calculation('sip', inputs, results, currency);
};

export const createRDCalculation = (inputs, results, currency = 'INR') => {
  return new Calculation('rd', inputs, results, currency);
};

export const createLoanEligibilityCalculation = (inputs, results, currency = 'INR') => {
  return new Calculation('loan-eligibility', inputs, results, currency);
};

export const createCAGRCalculation = (inputs, results, currency = 'INR') => {
  return new Calculation('cagr', inputs, results, currency);
};

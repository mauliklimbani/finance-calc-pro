// Formatting utilities

const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };
  
  export const formatCurrency = (amount, currency = 'INR') => {
    const symbol = currencySymbols[currency] || '₹';
    
    if (currency === 'INR') {
      // Indian number formatting with lakhs and crores
      return `${symbol}${formatIndianNumber(amount)}`;
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  export const formatIndianNumber = (num) => {
    const x = num.toString();
    const lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') {
      return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    } else {
      return lastThree;
    }
  };
  
  export const formatPercent = (value, decimals = 2) => {
    return `${value.toFixed(decimals)}%`;
  };
  
  export const formatNumber = (value, decimals = 0) => {
    return value.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };